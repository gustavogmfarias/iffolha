import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import Head from "next/head";
import { AuthProvider } from "../contexts/AuthContext";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "../../services/queryClient";
import { ModalPersistUserProvider } from "./dashboard/users/contexts/ModalPersistUserContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title> IFFolha Itaperuna | www.iffolhaitap.com.br </title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ReactQueryDevtools />
          <ChakraProvider theme={theme}>
            <ModalPersistUserProvider>
              <Component {...pageProps} />
            </ModalPersistUserProvider>
          </ChakraProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
