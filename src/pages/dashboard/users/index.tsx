import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";
import { setupAPIClient } from "../../../../services/api";
import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { Header } from "../../../components/Header";
import HistoricPage from "../../../components/ListPage/HistoricPage";
import { Sidebar } from "../../../components/Sidebar";
import { Pagination } from "./Pagination/Index";
import { SearchBox } from "./SearchBox";
import { TrowUser } from "./TrowUser";
import Breadcrumbs from "nextjs-breadcrumbs";
import Link from "next/link";

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
                onClick={() => ModalUsuario()}
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
                <Table colorScheme="green" variant="striped">
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
                      name={"Tiago"}
                      lastName={"Goulart"}
                      avatarLink={"111"}
                      email={"gustavo@gmail.com"}
                      role={"ADMIN"}
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
            <Pagination />
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
}

function ModalUsuario() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>Criar usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Custom backdrop filters!</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx); //aqui coloca-se o contexto porque é o contexto do lado do servidor

  return { props: {} }; //caso não tenha o cookie, não é pra fazer nada
});
