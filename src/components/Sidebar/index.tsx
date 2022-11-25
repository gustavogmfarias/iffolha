import { Flex, Box, Divider } from "@chakra-ui/react";
import { useContext } from "react";
import { RiUser3Line } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
import { AvatarPerfil } from "./Avatar";
import { NavLink } from "./NavLink";

export function Sidebar() {
  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    signOut();
  };

  return (
    <Flex
      as="aside"
      w="64"
      mr="4"
      direction="column"
      py="8"
      shadow="lg"
      bg="whiteAlpha.500"
    >
      <AvatarPerfil />

      <Flex as="aside" direction="column">
        <Box as="menu" flex="1">
          <NavLink
            name="Usuários"
            link="/dashboard/users"
            iconName={RiUser3Line}
          />

          <Divider my="6" borderColor="gray.700" ml="-4" />

          <NavLink name="SignOut" onMouseClick={() => handleSignOut()} />
          <NavLink name="Teste" link="/dashboard/users" />
        </Box>
      </Flex>
    </Flex>
  );
}
