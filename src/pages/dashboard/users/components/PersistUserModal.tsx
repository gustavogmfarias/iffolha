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

type User = {
  name: string;
  lastName: string;
  email: string;
  role: string;
  id: string;
  avatarUrl: string;
};

type ModalPersistUserProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

type PersistUserFormData = {
  email: string;
  name: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  role: string;
  avatar?: string;
};

const persistUserFormSchema = yup.object().shape({
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
  const { userToUpdate, isUpdate, setIsUpdate, setUserToUpdate } =
    usePersistUserModal();

  const [serverSideError, setServerSideError] = useState("");

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(persistUserFormSchema),
  });
  const { errors } = formState;

  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  const [avatarUpload, setAvatarUpload] = useState<any>();

  const [name, setName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirmation, setPasswordConfimation] = useState<string>();
  const [role, setRole] = useState<string>();
  const [email, setEmail] = useState<string>();

  const createUser = useMutation(
    async ({ name, lastName, email, password, role }: PersistUserFormData) => {
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

  function setAllFieldsNull() {
    setName("");
    setLastName("");
    setEmail("");
    setRole("");
    setPassword("");
    setPasswordConfimation("");
    setAvatar("");
    setAvatarUpload("");
  }

  function setAllUserDataOnFields(user: User) {
    setName(userToUpdate.name);
    setLastName(userToUpdate.lastName);
    setEmail(userToUpdate.email);
    setRole(userToUpdate.role);
    setPassword("");
    setPasswordConfimation("");
    setAvatar(userToUpdate.avatarUrl);
    setAvatarUpload("");
  }

  const handleInputAvatar = async (e) => {
    // const fr = new FileReader();

    // fr.readAsArrayBuffer(e.target.files[0]);

    // fr.onload = () => {
    //   setAvatarUpload(fr.result);
    // };

    if (e.target.files.length !== 0) {
      await setAvatar(URL.createObjectURL(e.target.files[0]));
      await setAvatarUpload(e.target.files[0]);
    }
  };

  const handleCreateUser: SubmitHandler<PersistUserFormData> = async (
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

  const handleUpdateUser: SubmitHandler<PersistUserFormData> = async (
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
    async function uploadImage() {
      const formData = new FormData();

      formData.append("avatar", avatarUpload);
      console.log(avatarUpload, "avatar deve estar binário");
      console.log(formData, "1");

      if (createUser.isSuccess) {
        try {
          userAvatar = await api.patch(
            `/users/avatar/${userCreated.id}`,
            formData.values[0],
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log(userAvatar, "useravatar");
          console.log(3);
        } catch (error) {
          console.log(error);
        }
      }
    }

    uploadImage();
  }, [createUser.isSuccess]);

  console.log(userToUpdate, "persistusermodal");

  function onModalClose() {
    setUserToUpdate(null);
    setIsUpdate(false);
    setAllFieldsNull();
    onClose();
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onModalClose}>
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        {!!isUpdate ? (
          <ModalHeader>Editar {userToUpdate.name}</ModalHeader>
        ) : (
          <ModalHeader>Criar usuário</ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody>
          <Box
            as="form"
            onSubmit={
              isUpdate
                ? handleSubmit(handleUpdateUser)
                : handleSubmit(handleCreateUser)
            }
          >
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
                value={name}
                error={errors.name}
                {...register("name")}
              ></InputInsideCreator>
              <InputInsideCreator
                label="Sobrenome:"
                name="lastName"
                type="text"
                value={lastName}
                error={errors.lastName}
                {...register("lastName")}
              ></InputInsideCreator>
              <InputInsideCreator
                label="E-mail:"
                name="email"
                type="email"
                value={email}
                error={errors.email}
                {...register("email")}
              ></InputInsideCreator>
              <InputInsideCreator
                label="Senha:"
                name="password"
                type="password"
                value={password}
                error={errors.password}
                {...register("password")}
              ></InputInsideCreator>
              <InputInsideCreator
                name="passwordConfirmation"
                type="password"
                label="Confirmação da senha"
                value={passwordConfirmation}
                error={errors.passwordConfirmation}
                {...register("passwordConfirmation")}
              ></InputInsideCreator>

              <SelectInsideCreators
                value={role}
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
          <Button onClick={onModalClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
