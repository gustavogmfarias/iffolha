import { Box, Flex, Image } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex
      direction="column"
      bg="project.main_light"
      as="header"
      w="70%"
      h="15%"
      justify="space-between"
      align="center"
    >
      <Box
        mx="auto"
        mt="4"
        px="6"
        width="100%"
        maxWidth={1480}
        h="20"
        align="center"
        justify="center"
      >
        <Image w="25%" src="/assets/logos/logo_fundo_text.png"></Image>
      </Box>
      <Box width="100%" maxWidth={1480} height="1" bg="project.text"></Box>
    </Flex>
  );
}
