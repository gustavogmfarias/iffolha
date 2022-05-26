import { Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { setupAPIClient } from "../../../services/api";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { AuthContext, getProfile } from "../../contexts/AuthContext";

type User = {
  avatar_url?: string;
  email?: string;
  id?: string;
  name?: string;
  role?: string;
};

export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    const userLogado = getProfile();

    console.log(userLogado);
  }, []);

  return (
    <Flex w="100vw" h="100vh" justify="center" direction="row-reverse">
      <Header />
      <Sidebar />
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx); //aqui coloca-se o contexto porque é o contexto do lado do servidor

  return { props: {} }; //caso não tenha o cookie, não é pra fazer nada
});
