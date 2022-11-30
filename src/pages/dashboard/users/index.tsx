import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Th,
  Text,
  Thead,
  Tr,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiPencilLine } from "react-icons/ri";
import { setupAPIClient } from "../../../../services/api";
import { api } from "../../../../services/apiClient";
import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { Header } from "../../../components/Header";
import HistoricPage from "../../../components/ListPage/HistoricPage";
import { Sidebar } from "../../../components/Sidebar";
import { useUsers } from "./hooks/useUsers";
import { Pagination } from "../../../components/Pagination/Index";
import { SearchBox } from "./components/SearchBox";
import { TrowUser } from "./components/TrowUser";
import PersistUserModal from "./components/PersistUserModal";
import { usePersistUserModal } from "./contexts/ModalPersistUserContext";
import { useMutation } from "react-query";
import { queryClient } from "../../../../services/queryClient";

export default function CreateUser() {
  let perPage: string = "10";
  let name: string;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(
    String(page),
    perPage
  );

  const { isOpen, onOpen, onClose } = usePersistUserModal();

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
                {isLoading ? (
                  <Flex justify="center" align="center">
                    <Spinner />
                  </Flex>
                ) : error ? (
                  <Flex justify="center" align="center">
                    <Text>Falha ao obter os usuários</Text>
                  </Flex>
                ) : (
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
                  </Table>
                )}
              </Box>
            </SimpleGrid>
            <Pagination
              totalCountOfRegisters={data?.totalCount}
              currentPage={page}
              onPageChange={setPage}
              page={page}
            />
          </Stack>
        </Flex>
      </Flex>
      <PersistUserModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx); //aqui coloca-se o contexto porque é o contexto do lado do servidor

  return { props: {} }; //caso não tenha o cookie, não é pra fazer nada
});
