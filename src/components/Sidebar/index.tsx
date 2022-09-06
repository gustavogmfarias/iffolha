import { Flex, Box } from "@chakra-ui/react";
import { AvatarPerfil } from "./Avatar";
import { NavLink } from "./NavLink";

export function Sidebar() {
  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      as="aside"
      width="15%"
      bg="white"
      align="center"
      shadow="lg"
    >
      <Box my="3">
        <AvatarPerfil />
      </Box>
      <Box py="2">
        <NavLink name="Criar Usuário" link="/dashboard/createuser" />
        <NavLink name="SignOut" />
        <NavLink name="vincenzo" />
        <NavLink />
        <NavLink />
        <NavLink />
        <NavLink />
      </Box>
    </Flex>
  );
}
