import { Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { setupAPIClient } from "../../../services/api";
import { api } from "../../../services/apiClient";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  return (
    <Flex w="100vw" h="100vh" justify="center" direction="row-reverse">
      <Header />
      <Sidebar />
    </Flex>
  );
}
