import { Avatar, Button, Icon, Td, Text, Tr } from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";

interface TrowUserProps {
  id: string;
  name: string;
  lastName: string;
  avatarLink: string;
  email: string;
  role: string;
  createdAt: string;
}

export function TrowUser({
  id,
  name,
  lastName,
  avatarLink,
  email,
  role,
  createdAt,
}: TrowUserProps) {
  return (
    <Tr>
      <Td>
        <Avatar size="sm" name={name + " " + lastName} src={avatarLink} />
      </Td>
      <Td>
        <Text>{name}</Text>
      </Td>
      <Td>
        <Text>{lastName}</Text>
      </Td>
      <Td>
        <Text>{email}</Text>
      </Td>
      <Td>
        <Text>{role}</Text>
      </Td>

      <Td>
        <Text>{createdAt}</Text>
      </Td>
      <Td>
        <Button
          as="a"
          size="sm"
          fontSize="sm"
          colorScheme="green"
          leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
        >
          Editar
        </Button>
      </Td>
      <Td>
        <Button
          as="a"
          size="sm"
          fontSize="sm"
          colorScheme="green"
          leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
        >
          Deletar
        </Button>
      </Td>
    </Tr>
  );
}
