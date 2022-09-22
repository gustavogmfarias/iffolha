import { Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { setupAPIClient } from "../../../../services/api";
import { api } from "../../../../services/apiClient";
import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { Input } from "../../../components/Form/Input";
import { FormFlex } from "../../../components/FormFlex";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { AuthContext } from "../../../contexts/AuthContext";

export default function CreateUser() {
  return (
    <Flex direction="column" h="100vh" maxWidth={1460} justify="flex-start">
      <Header />

      <Flex w="100%" maxWidth={1460}>
        <Sidebar />

        <FormFlex />
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx); //aqui coloca-se o contexto porque é o contexto do lado do servidor

  return { props: {} }; //caso não tenha o cookie, não é pra fazer nada
});
