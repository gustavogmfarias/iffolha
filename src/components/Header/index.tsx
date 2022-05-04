import { Box, Flex, Image } from "@chakra-ui/react";

export function Header() {
  return (
    <Flex
      direction="column"
      bg="project.main_light"
      as="header"
      w="70%"
      h="15%"
      justify="center"
      align="center"
      maxWidth={1480}
    >
      <Box
        mx="auto"
        mt="6"
        px="6"
        width="100%"
        h="20"
        align="center"
        borderBottom="5px solid"
        borderColor="project.text"
      >
        <Image w="25%" src="/assets/logos/logo_fundo_text.png"></Image>
      </Box>
    </Flex>
  );
}
