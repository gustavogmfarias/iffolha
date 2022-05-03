import { Flex } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <Flex w="100vw" h="100vh" justify="center">
      <Sidebar />

      <Header />
    </Flex>
  );
}
