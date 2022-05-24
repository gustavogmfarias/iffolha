import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm, FieldError } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiTwotoneMail } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { withSSRGuest } from "../../utils/withSSRGuest";
import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
    await signIn(values);
  };
  console.log(formState.errors);

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        onSubmit={handleSubmit(handleSignIn)}
        w="100%"
        maxWidth={360}
        bg="project.main"
        color="blackAlpha.500"
        p="8"
        borderRadius={24}
        flexDirection="column"
        boxShadow="md"
      >
        <Flex mb="8" alignItems="center" justifyContent="center">
          <Image w="40" src="/assets/logos/logo_fundo_text.png" alt="test" />
        </Flex>

        <Stack spacing="4">
          <InputGroup>
            <InputLeftElement
              borderRight="0.8px solid"
              borderColor="project.text"
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              // eslint-disable-next-line react/no-children-prop
              children={
                <Icon as={AiTwotoneMail} fontSize="12" color="project.text" />
              }
            />
            <Input
              name="email"
              id="email"
              type="email"
              error={errors.email}
              {...register("email")}
              placeholder="insira seu e-mail"
              _placeholder={{
                color: "project.text",
                alignItems: "center",
                fontWeight: "regular",
                textAlign: "center",
              }}
              bgColor="project.main_light"
              color="project.text"
              border="0"
              focusBorderColor="project.main_light"
              size="md"
              _hover={{ bgColor: "project.main_light" }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              borderRight="0.8px solid"
              borderColor="project.text"
              // eslint-disable-next-line react/no-children-prop
              children={
                <Icon
                  as={RiLockPasswordFill}
                  fontSize="12"
                  color="project.text"
                />
              }
            />

            <Input
              fontFamily=""
              name="password"
              type="password"
              error={errors.password}
              {...register("password")}
              placeholder="insira sua senha"
              _placeholder={{
                color: "project.text",
                alignItems: "center",
                fontWeight: "regular",
                textAlign: "center",
              }}
              bgColor="project.main_light"
              color="project.text"
              border="0"
              focusBorderColor="project.main_light"
              size="md"
            />
          </InputGroup>
        </Stack>
        <Flex w="100%" align="center" justify="center">
          <Button
            type="submit"
            mt="4"
            borderRadius="24"
            width="100%"
            bg="project.text"
            color="white"
            fontFamily="bold"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return { props: {} }; //caso não tenha o cookie, não é pra fazer nada
});
