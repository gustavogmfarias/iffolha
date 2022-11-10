import { useQuery } from "react-query";
import { setupAPIClient } from "../../../../../services/api";
import { api } from "../../../../../services/apiClient";

type User = {
  id: string;
  name: string;
  email: string;
  lastName: string;
  avatarUrl: string;
  role: string;
  createdAt: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

export async function getUsers(
  page: string,
  perPage: string,
  name = null
): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("users", {
    params: { page, perPage, name },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      role: String(user.role).toLowerCase(),
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return { users, totalCount };
}

export function useUsers(page: string, perPage: string) {
  return useQuery(
    ["users", page, perPage],
    () => getUsers(page, perPage, name),
    {
      staleTime: 1000 * 60 * 10,
    }
  );
}
