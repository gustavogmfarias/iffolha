import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { setupAPIClient } from "../../../../services/api"
import { api } from "../../../../services/apiClient"
import { withSSRAuth } from "../../../../utils/withSSRAuth"
import { Input } from "../../../components/Form/Input"
import { FormFlex } from "../../../components/FormFlex"
import { Header } from "../../../components/Header"
import HistoricPage from "../../../components/ListPage/HistoricPage"
import { Sidebar } from "../../../components/Sidebar"
import { AuthContext } from "../../../contexts/AuthContext"

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
            <SimpleGrid
              flex="1"
              gap="2"
              minChildWidth="320px"
              alignItems="flex-start"
              mt="2"
            >
              <Box p="8" bg="gray.800" borderRadius={8}>
                <FormFlex />
              </Box>
              <Box p="8" bg="gray.800" borderRadius={8}>
                <FormFlex />
              </Box>
              <Box p="8" bg="gray.800" borderRadius={8}>
                <FormFlex />
              </Box>
              <Box p="8" bg="gray.800" borderRadius={8}>
                <FormFlex />
              </Box>
            </SimpleGrid>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx) //aqui coloca-se o contexto porque é o contexto do lado do servidor

  return { props: {} } //caso não tenha o cookie, não é pra fazer nada
})
