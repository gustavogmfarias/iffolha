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

      setUser({email, role});

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  async function getProfile({ avatar_url, email, id, name, role }: User) {
    const cookies = parseCookies(ctx)
    const token = cookies["nextauth.token"];

    const userLogado = await api.get<User>("users/profile", {
      headers: { Authorization: `Bearer ${}` },
    });
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
