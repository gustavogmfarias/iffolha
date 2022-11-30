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
import { useState } from "react";

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
    .required("Role é obrigatório")
    .oneOf(["ADMIN", "USER", "EDITOR", "AUTHOR"]),
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
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function PersistUserModal({
  isOpen,
  onClose,
  onOpen,
}: ModalPersistUserProps) {
  const [serverSideError, setServerSideError] = useState(
    "erro tem que aparecer aqui"
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { errors } = formState;

  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  console.log("Image Files", avatar);

  const createUser = useMutation(
    async ({ name, lastName, email, password, role }: CreateUserFormData) => {
      const response = await api.post("users", {
        name,
        lastName,
        email,
        password,
        role,
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        onClose();
      },
    },
    {
      onError: (err) => {
        setServerSideError(err);
        console.log(err.response.data.message);
      },
    }
  );

  const handleInputAvatar = (e) => {
    if (e.target.files.length !== 0) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);
  };

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

              <Select
                error={errors.role}
                {...register("role")}
                placeholder="Escolha um Papel"
                bgColor="project.main_lighter"
              >
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
                <option value="EDITOR">Editor</option>
                <option value="AUTHOR">Author</option>
              </Select>

              <Button
                type="submit"
                isLoading={formState.isSubmitting}
                colorScheme="green"
              >
                Salvar
              </Button>

              <Text>{serverSideError}</Text>
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
