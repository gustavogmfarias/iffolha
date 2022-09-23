import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
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
    <Flex h="100vh" maxWidth={1460} align="flex-start">
      <Flex w="80%" maxWidth={1460} mx="auto">
        <Sidebar />
        <Header />
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p="8" bg="gray.800" borderRadius={8}>
            <FormFlex />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx); //aqui coloca-se o contexto porque é o contexto do lado do servidor

  return { props: {} }; //caso não tenha o cookie, não é pra fazer nada
});
