import { Text, Stack, Flex } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function AvatarPerfil() {
  const { user } = useContext(AuthContext);

  return (
    <Flex direction="row" alignItems="center" justify="center">
      <Avatar
        borderColor="project.text"
        borderWidth={2}
        size="md"
        name={user?.name}
        src={user?.avatarUrl}
        mr="1"
      />

      <Stack spacing="0.01" align="center">
        <Text fontWeight="bold" color="project.text" fontSize="17" mb="-2">
          {user?.name}
        </Text>
        <Text fontWeight="light" color="project.text" fontSize="12">
          {String(user?.role).toLowerCase()}
        </Text>
      </Stack>
    </Flex>
  );
}
