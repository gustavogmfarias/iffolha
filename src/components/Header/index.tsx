import { Box, Flex, Image } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex
      as="header"
      bg="project.main_light"
      w="100%"
      h="120"
      minHeight="80px"
      justifyContent="center"
      align="center"
      maxWidth={1480}
      minW="600"
      borderBottom="5px solid"
      borderColor="project.text"
      mx="auto"
      px="6"
    >
      <Image
        h="20"
        minWidth="20"
        src="/assets/logos/logo_fundo_text.png"
      ></Image>
    </Flex>
  );
}
