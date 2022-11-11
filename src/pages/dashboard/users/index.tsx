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
  Text,
  Thead,
  Tr,
  Select,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiPencilLine } from "react-icons/ri";
import { setupAPIClient } from "../../../../services/api";
import { api } from "../../../../services/apiClient";
import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { InputInsideCreator } from "../../../components/Form/InputInsideCreators";
import { Header } from "../../../components/Header";
import HistoricPage from "../../../components/ListPage/HistoricPage";
import { Sidebar } from "../../../components/Sidebar";
import { useUsers } from "./hooks/useUsers";
import { Pagination } from "../../../components/Pagination/Index";
import { SearchBox } from "./SearchBox";
import { TrowUser } from "./TrowUser";

export default function CreateUser() {
  let perPage: string = "1";
  let name: string;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(
    String(page),
    perPage
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleSearch(name: string) {
    const response = await api.get(`users`, {
      params: { name: name },
    });
    return response.data;
  }

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
              <SearchBox value={search} onSearch={() => {}} />
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" mr="auto" ml="4" />
              )}
              <Button
                as="a"
                onClick={onOpen}
                size="sm"
                fontSize="sm"
                colorScheme="green"
                _hover={{ cursor: "pointer" }}
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
                  {isLoading ? (
                    <Flex justify="center" align="center">
                      <Spinner />
                    </Flex>
                  ) : error ? (
                    <Flex justify="center" align="center">
                      <Text>Falha ao obter os usuários</Text>
                    </Flex>
                  ) : (
                    <Tbody>
                      {data?.users.map((user) => {
                        return (
                          <TrowUser
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            lastName={user.lastName}
                            avatarLink={user.avatarUrl}
                            email={user.email}
                            role={user.role}
                            createdAt={user.createdAt}
                          />
                        );
                      })}
                    </Tbody>
                  )}
                </Table>
              </Box>
            </SimpleGrid>
            <Pagination
              totalCountOfRegisters={200}
              currentPage={page}
              onPageChange={setPage}
              page={page}
            />
          </Stack>
        </Flex>
      </Flex>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader>Criar usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box as="form">
              <Stack>
                <InputInsideCreator
                  label="Nome:"
                  name="name"
                  type="text"
                ></InputInsideCreator>
                <InputInsideCreator
                  label="E-mail:"
                  name="email"
                  type="email"
                ></InputInsideCreator>
                <InputInsideCreator
                  label="Senha:"
                  name="password"
                  type="password"
                ></InputInsideCreator>

                <Select
                  placeholder="Escolha um Papel"
                  bgColor="project.main_lighter"
                >
                  <option value="option1">Admin</option>
                  <option value="option2">User</option>
                  <option value="option3">Editor</option>
                  <option value="option3">Author</option>
                </Select>
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onClose} colorScheme="green">
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx); //aqui coloca-se o contexto porque é o contexto do lado do servidor

  return { props: {} }; //caso não tenha o cookie, não é pra fazer nada
});
