import { Flex, Box } from "@chakra-ui/react"
import { AvatarPerfil } from "./Avatar"
import { NavLink } from "./NavLink"

export function Sidebar() {
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
            iconName="RiUser3Line"
          />
          <NavLink name="SignOut" />
          <NavLink name="Teste" />
          <NavLink />
          <NavLink />
          <NavLink />
          <NavLink />
        </Box>
      </Flex>
    </Flex>
  )
}
