import { Flex, Text, Icon } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

export function NavLink() {
  return (
    <Flex
      w="40"
      flexDirection="row"
      align="center"
      justify="space-between"
      fontWeight="bold"
      p="2"
    >
      <Icon as={FaUser} fontSize="12" color="project.text" />
      <Text mr="10" fontSize="12" color="project.text">
        Usuários
      </Text>
    </Flex>
  );
}
