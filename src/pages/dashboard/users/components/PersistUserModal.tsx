import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Select,
  Avatar,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { queryClient } from "../../../../../services/queryClient";
import router, { useRouter } from "next/router";

import { InputInsideCreator } from "../../../../components/Form/InputInsideCreators";
import { api } from "../../../../../services/apiClient";
import { useEffect, useState } from "react";
import { SelectInsideCreators } from "../../../../components/Form/SelectInsideCreators";
import { usePersistUserModal } from "../contexts/ModalPersistUserContext";

type ModalPersistUserProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

type CreateUserFormData = {
  email: string;
  name: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  role: string;
  avatar?: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  lastName: yup.string().required("Sobrenome é obrigatório"),
  role: yup
    .mixed()
    .required("Papel é obrigatório")
    .oneOf(["ADMIN", "USER", "EDITOR", "AUTHOR"], "Role é obrigatório"),
  email: yup
    .string()
    .required("E-mail é obrigatório")
    .email("Coloque um e-mail válido"),
  password: yup
    .string()
    .required("Senha é obrigatório")
    .min(6, "A senha precisa ter no mínimo 6 caracteres"),
  passwordConfirmation: yup
    .string()
    .required("Confirmação de Senha é obrigatório")
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

let userCreated, avatar, userAvatar;

export default function PersistUserModal({
  isOpen,
  onClose,
  onOpen,
}: ModalPersistUserProps) {
  const { status, setStatus } = usePersistUserModal();

  const [serverSideError, setServerSideError] = useState("");

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { errors } = formState;

  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  const [avatarUpload, setAvatarUpload] = useState("");

  const createUser = useMutation(
    async ({ name, lastName, email, password, role }: CreateUserFormData) => {
      const response = await api.post("users", {
        name,
        lastName,
        email,
        password,
        role,
      });
      // useCreated = response.data[0];
      return response.data[0];
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        onClose();
        reset();
        setStatus("Usuário criado com sucesso");
        setTimeout(() => {
          setStatus("");
        }, 5000);
      },
    },
    {
      onError: (err) => {
        return err;
      },
    }
  );

  const handleInputAvatar = (e) => {
    if (e.target.files.length !== 0) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
      setAvatarUpload(e.target.files[0]);
    }
  };

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    try {
      userCreated = await createUser.mutateAsync(values);
      setServerSideError("");
    } catch (err) {
      setServerSideError(err.response.data.message);
      {
        setTimeout(() => {
          setServerSideError("");
        }, 5000);
      }
    }
  };

  let userAvatar;

  useEffect(() => {
    const formData = new FormData();

    formData.append("avatar", avatar);
    console.log(formData, "1");
    if (createUser.isSuccess) {
      async () => {
        userAvatar = await api.patch(
          `/users/avatar/${userCreated.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(userAvatar, "useravatar");
        console.log(3);
      };
    }
  }, [createUser.isSuccess]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalHeader>Criar usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit(handleCreateUser)}>
            <Flex justify="center" mb="2" dir="column">
              <Avatar size="lg" src={avatar} />
              <Input
                type="file"
                id="avatar"
                name="avatar"
                accept=".jpg, .jpeg, .png"
                onChange={handleInputAvatar}
              />
            </Flex>

            <Stack>
              <InputInsideCreator
                label="Nome:"
                name="name"
                type="text"
                error={errors.name}
                {...register("name")}
              ></InputInsideCreator>
              <InputInsideCreator
                label="Sobrenome:"
                name="lastName"
                type="text"
                error={errors.lastName}
                {...register("lastName")}
              ></InputInsideCreator>
              <InputInsideCreator
                label="E-mail:"
                name="email"
                type="email"
                error={errors.email}
                {...register("email")}
              ></InputInsideCreator>
              <InputInsideCreator
                label="Senha:"
                name="password"
                type="password"
                error={errors.password}
                {...register("password")}
              ></InputInsideCreator>
              <InputInsideCreator
                name="passwordConfirmation"
                type="password"
                label="Confirmação da senha"
                error={errors.passwordConfirmation}
                {...register("passwordConfirmation")}
              ></InputInsideCreator>

              <SelectInsideCreators
                error={errors.role}
                {...register("role")}
                name="role"
                placeholder="Escolha um Papel"
              >
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
                <option value="EDITOR">Editor</option>
                <option value="AUTHOR">Author</option>
              </SelectInsideCreators>

              <Button
                type="submit"
                isLoading={formState.isSubmitting}
                colorScheme="green"
              >
                Salvar
              </Button>
              <Flex
                alignItems="center"
                justify="center"
                bg="red.600"
                color="white"
                fontWeight="bold"
                borderRadius="6"
              >
                <Text>{serverSideError}</Text>
              </Flex>
            </Stack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
