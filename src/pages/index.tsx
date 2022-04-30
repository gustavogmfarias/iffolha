import { Box, Button, Flex, Image, Input, Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="green.200"
        color="blackAlpha.500"
        p="8"
        borderRadius={24}
        flexDirection="column"
      >
        <Box>
          <Image src="../../assets/logos/logo-com-texto.png" alt="test" />
        </Box>

        <Stack spacing="4">
          <Input
            name="login"
            type="email"
            placeholder="insira seu e-mail"
            bgColor="green.100"
            border="0"
            focusBorderColor="green.500"
            variant="filled"
          />
          <Input
            fontFamily=""
            name="password"
            type="password"
            placeholder="insira sua senha"
            bgColor="green.100"
            border="0"
            focusBorderColor="green.500"
          />
        </Stack>
        <Flex w="100%" align="center" justify="center">
          <Button
            type="submit"
            mt="4"
            borderRadius="24"
            width="50%"
            colorScheme="green"
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
