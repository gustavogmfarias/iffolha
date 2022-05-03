import { Flex, Image, Box, Spacer, Text, Stack, Icon } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

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
      <Spacer px="8" py="8" flexDirection="row">
        <Flex justify="space-around" align="center">
          <Box>
            <Image
              borderRadius="full"
              borderColor="project.text"
              borderStyle="solid"
              boxSize="12"
              src="/assets/avatar/perfil.jpg"
              alt="avatar"
            ></Image>
          </Box>

          <Box justify="right">
            <Stack spacing="0.01">
              <Text
                fontWeight="bold"
                color="project.text"
                fontSize="17"
                mb="-2"
              >
                Gustavo
              </Text>
              <Text fontWeight="light" color="project.text" fontSize="12">
                administrador
              </Text>
            </Stack>
          </Box>
        </Flex>
      </Spacer>
      <Spacer>
        <Flex flexDirection="row" mx="4" fontWeight="bold">
          <FaUser color="project.text" />
          <Text ml="12" fontSize="12" color="project.text">
            Usuários
          </Text>
        </Flex>
      </Spacer>
    </Flex>
  );
}
