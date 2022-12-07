import {
  Avatar,
  Button,
  Icon,
  Td,
  Text,
  Tr,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";
import { useMutation } from "react-query";
import { api } from "../../../../../services/apiClient";
import { queryClient } from "../../../../../services/queryClient";
import { usePersistUserModal } from "../contexts/ModalPersistUserContext";
import { useRef } from "react";

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
  const { status, setStatus } = usePersistUserModal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const deleteUser = useMutation(
    async (userId: string) => {
      const response = await api.delete(`users/${userId}`);
      return response.message;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        setStatus("Usuário deletado com sucesso");
        setTimeout(() => {
          setStatus("");
        }, 5000);
      },
    },
    {
      onError: (err) => {},
    }
  );

  const handleDeleteUser = async (userId) => {
    let userDeleted;
    try {
      userDeleted = await deleteUser.mutateAsync(userId);
      onClose();
    } catch (err) {
      return err;
    }

    console.log(userDeleted);
  };

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
          onClick={onOpen}
        >
          Deletar
        </Button>
      </Td>
    </Tr>
  );

  <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Delete Customer
        </AlertDialogHeader>

        <AlertDialogBody>Você tem certeza? </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" onClick={() => handleDeleteUser(id)} ml={3}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>;
}
