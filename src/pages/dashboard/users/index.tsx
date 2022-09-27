import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { RiPencilLine } from "react-icons/ri";
import { setupAPIClient } from "../../../../services/api";
import { api } from "../../../../services/apiClient";
import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { Input } from "../../../components/Form/Input";
import { FormFlex } from "../../../components/FormFlex";
import { Header } from "../../../components/Header";
import HistoricPage from "../../../components/ListPage/HistoricPage";
import { Sidebar } from "../../../components/Sidebar";
import { AuthContext } from "../../../contexts/AuthContext";
import { SearchBox } from "./SearchBox";
import { TrowUser } from "./TrowUser";

export default function CreateUser() {
  return (
    <Flex direction="column" h="100vh" w="100vw" maxWidth={1480} mx="auto">
      <Header />
      <Flex w="100%" maxWidth={1480}>
        <Sidebar />

        <Flex shadow="lg" borderRadius="8" flex="1">
          <Stack flex="1" m="5">
            <HStack>
              <HistoricPage name="dashboard" link="/dashboard" />
              <HistoricPage
                name="usuários"
                link="/dashboard/users"
                lastPage={true}
              />
            </HStack>
            <Flex mx="auto" p="8" justify="space-between" align="center">
              <SearchBox />

              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
              >
                Adicionar
              </Button>
            </Flex>

            <SimpleGrid
              flex="1"
              gap="2"
              minChildWidth="320px"
              alignItems="flex-start"
              mt="2"
              mx="auto"
            >
              <Box>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th w="8">Avatar</Th>
                      <Th>Nome</Th>
                      <Th>Sobrenome</Th>
                      <Th>E-mail</Th>
                      <Th>Role</Th>
                      <Th>Criado em</Th>
                      <Th w="8"></Th>
                      <Th w="8"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <TrowUser
                      id={"111"}
                      name={"Gustavo"}
                      lastName={"Goulart"}
                      avatarLink={"111"}
                      email={"gustavo@gmail.com"}
                      role={"USER"}
                      createdAt={"04 de abril de 2021"}
                    />
                    <TrowUser
                      id={"111"}
                      name={"Gustavo"}
                      lastName={"Goulart"}
                      avatarLink={"111"}
                      email={"gustavo@gmail.com"}
                      role={"USER"}
                      createdAt={"04 de abril de 2021"}
                    />
                  </Tbody>
                </Table>
              </Box>
            </SimpleGrid>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx); //aqui coloca-se o contexto porque é o contexto do lado do servidor

  return { props: {} }; //caso não tenha o cookie, não é pra fazer nada
});
