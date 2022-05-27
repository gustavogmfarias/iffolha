import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface IError {
  error: string;
}

export function ErrorFrame({ error }: IError) {
  return (
    <Flex>
      <Text color="red">{error}</Text>
    </Flex>
  );
}
