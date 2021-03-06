import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import decode from "jwt-decode";
import { validateUserPermissions } from "./validateUserPermissions";

type WithSSRAuthOptions = { role: string };

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
) {
  //fn: GetServerSideProps significa que a função vai receber como parametro uma outra função

  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx); //ctx é o contexto, no caso, next page context
    const token = cookies["nextauth.token"];

    if (!token)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };

    if (options) {
      const user = decode<{ role: string }>(token);
      const { role } = options;

      const userHasValidPermissions = validateUserPermissions({
        user,
        role,
      });

      if (!userHasValidPermissions) {
        return { redirect: { destination: "/dashboard", permanent: false } };
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, "nextauth.token");
        destroyCookie(ctx, "nextauth.refreshToken");
        return { redirect: { destination: "/", permanent: false } };
      }
    }

    return {
      redirect: {
        destination: "/error", // Em caso de um erro não esperado, você pode redirecionar para uma página publica de erro genérico
        permanent: false,
      },
    };
  };
}
