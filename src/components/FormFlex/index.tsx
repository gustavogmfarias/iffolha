import { Flex } from "@chakra-ui/react";
import { Input } from "../Form/Input";

export function FormFlex() {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      as="div"
      width="50%"
      justifyItems="center"
      align="self-end"
    >
      <Flex as="form">
        <Input name="Teste"></Input>
      </Flex>
    </Flex>
  );
}
