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
  Link,
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
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../../../../services/queryClient";

export default function CreateUser() {
  let perPage: string = "10";
  let name: string;

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(
    String(page),
    perPage,
    search
  );

  const { isOpen, onOpen, onClose, status } = usePersistUserModal();

  async function handleSearchBox(name: string) {
    setSearch(name);
  }

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/findbyid?id=${userId}`);
        return response.data;
      },
      { staleTime: 1000 * 60 * 10 }
    ); //10 minutos
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
              <SearchBox
                name="searchBox"
                value={search}
                onChange={(event) => handleSearchBox(event.target.value)}
              />
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" mr="auto" ml="4" />
              )}
              {!!status && (
                <Flex
                  bg="green.600"
                  color="white"
                  fontWeight="bold"
                  borderRadius="6"
                >
                  <Text>{status}</Text>
                </Flex>
              )}
              <Button
                as="a"
                onClick={() => onOpen()}
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
                            prefetchUser={() =>
                              handlePrefetchUser(String(user.id))
                            }
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
      <PersistUserModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={() => onOpen()}
      />
    </Flex>
  );
}
