import { Flex, Box } from "@chakra-ui/react";
import { AvatarPerfil } from "./Avatar";
import { NavLink } from "./NavLink";

export function Sidebar() {
  return (
    <Box as="aside" w="15%" bg="white" shadow="lg" mx="auto">
      <Box>
        <AvatarPerfil />

        <Box as="menu">
          <NavLink name="Criar Usuário" link="/dashboard/createuser" />
          <NavLink name="SignOut" />
          <NavLink name="Teste" />
          <NavLink />
          <NavLink />
          <NavLink />
          <NavLink />
        </Box>
      </Box>
    </Box>
  );
}
