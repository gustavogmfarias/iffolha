import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface IError {
  error: string;
}

export function ErrorFrame({ error }: IError) {
  return (
    <Flex justify="center">
      <Text pt="2" color="white">
        {error}
      </Text>
    </Flex>
  );
}
