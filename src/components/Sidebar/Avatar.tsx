import { Box, Flex, Image, Text, Stack } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

export function AvatarPerfil() {
  return (
    <Stack direction="row" align="center">
      <Avatar
        border="3px solid"
        size="md"
        name="Gustavo Goulart"
        src="/assets/avatar/perfil.jpg"
      />

      <Stack spacing="0.01">
        <Text fontWeight="bold" color="project.text" fontSize="17" mb="-2">
          Gustavo
        </Text>
        <Text fontWeight="light" color="project.text" fontSize="12">
          administrador
        </Text>
      </Stack>
    </Stack>
  );
}
