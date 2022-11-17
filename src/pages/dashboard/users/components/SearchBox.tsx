import { Flex, HStack, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

interface SearchProps {
  value: string;
  onSearch: (content: string) => void;
}

export function SearchBox({ value, onSearch }: SearchProps) {
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="0"
      maxWidth="400"
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="green.500"
      borderRadius="full"
    >
      <Input
        color="green.50"
        variant="unstyled"
        px="4"
        mr="4"
        value={value}
        placeholder="Digite um nome"
        _placeholder={{ color: "white" }}
        onChange={() => onSearch(value)}
      ></Input>

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
