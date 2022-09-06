import { Text, Stack } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function AvatarPerfil() {
  const { user } = useContext(AuthContext);

  return (
    <Stack direction="row" align="center">
      <Avatar
        borderColor="project.text"
        borderWidth={2}
        size="md"
        name={user?.name}
        src={user?.avatarUrl}
      />

      <Stack spacing="0.01">
        <Text fontWeight="bold" color="project.text" fontSize="17" mb="-2">
          {user?.name}
        </Text>
        <Text fontWeight="light" color="project.text" fontSize="12">
          {String(user?.role).toLowerCase()}
        </Text>
      </Stack>
    </Stack>
  );
}
