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
  Link,
} from "@chakra-ui/react";
import { RiPencilLine } from "react-icons/ri";
import { useMutation, useQuery } from "react-query";
import { api } from "../../../../../services/apiClient";
import { queryClient } from "../../../../../services/queryClient";
import { usePersistUserModal } from "../contexts/ModalPersistUserContext";
import { useRef } from "react";

type User = {
  name: string;
  lastName: string;
  email: string;
  role: string;
  id: string;
  avatarUrl: string;
};

interface TrowUserProps {
  id: string;
  name: string;
  lastName: string;
  avatarLink: string;
  email: string;
  role: string;
  createdAt: string;
  prefetchUser: (userId: string) => void;
}

export function TrowUser({
  id,
  name,
  lastName,
  avatarLink,
  email,
  role,
  createdAt,
  prefetchUser,
}: TrowUserProps) {
  const { status, setStatus, onOpen: openModal } = usePersistUserModal();
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

  const { data } = useQuery("user");
  const handleUpdateUser = async (user: User) => {
    openModal(userToUpdate);
  };

  return (
    <>
      <Tr>
        <Td>
          <Avatar size="sm" name={name + " " + lastName} src={avatarLink} />
        </Td>
        <Td>
          <Link onMouseEnter={() => prefetchUser(id)}>
            <Text>{name}</Text>
          </Link>
        </Td>
        <Td>
          <Link onMouseEnter={() => prefetchUser(id)}>
            <Text>{lastName}</Text>
          </Link>
        </Td>
        <Td>
          <Link onMouseEnter={() => prefetchUser(id)}>
            <Text>{email}</Text>
          </Link>
        </Td>
        <Td>
          <Link onMouseEnter={() => prefetchUser(id)}>
            <Text>{role}</Text>
          </Link>
        </Td>

        <Td>
          <Link onMouseEnter={() => prefetchUser(id)}>
            <Text>{createdAt}</Text>
          </Link>
        </Td>
        <Td>
          <Link onMouseEnter={() => prefetchUser(id)}>
            <Button
              onClick={() => {
                const userToUpdate = data.find((user) => user.id === id);
                handleUpdateUser(userToUpdate);
              }}
              cursor="pointer"
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="green"
              leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
            >
              Editar
            </Button>
          </Link>
        </Td>
        <Td>
          <Button
            cursor="pointer"
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

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Usuário
            </AlertDialogHeader>

            <AlertDialogBody>Você tem certeza?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteUser(id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
