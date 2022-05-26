import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../../services/apiClient";

type User = {
  avatar_url?: string;
  email?: string;
  id?: string;
  name?: string;
  role?: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut(): void;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");
  Router.push("/");
}

export async function getProfile(): Promise<User> {
  // const cookies = parseCookies(ctx);
  // const token = cookies["nextauth.token"];

  try {
    const response = await api.get<User>("users/profile", {
      headers: {
        Authorization: `Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY1MzUyNTc4MCwiZXhwIjoxNjUzNTI2NjgwLCJzdWIiOiI3OGFhNmJlNy02NmRmLTQ3NWMtYmQ4ZC05NDRlYTczYzNkM2QifQ.SHsnHkgjBTKaSXFCh_iUO-h3qkmCPg6Dxensetfjbek`,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user; // o !! significa que se estiver vazio retorna falso e se não, true

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("sessions", { email, password });

      const { token, refresh_token, role } = response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 15, // 15 minutos
        path: "/",
      });
      setCookie(undefined, "nextauth.refreshToken", refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({ email, role });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
