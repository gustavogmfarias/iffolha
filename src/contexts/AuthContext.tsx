import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../../services/apiClient";

type User = {
  avatarUrl?: string;
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

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    if (token) {
      api
        .get("/users/profile")
        .then((response) => {
          const { avatarUrl, email, id, name, role } = response.data;

          setUser({ avatarUrl, email, id, name, role });
        })
        .catch((error) => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post("sessions", { email, password });

    const { token, refreshToken } = response.data;

    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 15, // 15 min
      path: "/",
    });
    setCookie(undefined, "nextauth.refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    api
      .get("/users/profile")
      .then((response) => {
        const { avatarUrl, email, id, name, role } = response.data;

        setUser({ avatarUrl, email, id, name, role });
      })
      .catch((error) => {
        signOut();
      });

    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
