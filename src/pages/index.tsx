import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";

export default function Home() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="project.main"
        color="blackAlpha.500"
        p="8"
        borderRadius={24}
        flexDirection="column"
        boxShadow="md"
      >
        <Box mb="8">
          <Image src="/assets/logos/logo-com-texto.png" alt="test" />
        </Box>

        <Stack spacing="4">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="@"
            />
            <Input
              name="login"
              type="email"
              placeholder="insira seu e-mail"
              _placeholder={{
                color: "project.text",
                alignItems: "center",
                fontWeight: "regular",
                textAlign: "center",
              }}
              bgColor="project.main_light"
              color="project.text"
              border="0"
              focusBorderColor="project.main_light"
              size="md"
              _hover={{ bgColor: "project.main_light" }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="*"
            />

            <Input
              fontFamily=""
              name="password"
              type="password"
              placeholder="insira sua senha"
              _placeholder={{
                color: "project.text",
                alignItems: "center",
                fontWeight: "regular",
                textAlign: "center",
              }}
              bgColor="project.main_light"
              color="project.text"
              border="0"
              focusBorderColor="project.main_light"
              size="md"
            />
          </InputGroup>
        </Stack>
        <Flex w="100%" align="center" justify="center">
          <Button
            type="submit"
            mt="4"
            borderRadius="24"
            width="100%"
            colorScheme="green"
            fontFamily="bold"
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
