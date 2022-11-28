import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface ModalPersistUserProviderProps {
  children: ReactNode;
}

type ModalPersistUserProviderData = UseDisclosureReturn;

const ModalPersistUserContext = createContext(
  {} as ModalPersistUserProviderData
);

export function ModalPersistUserProvider({
  children,
}: ModalPersistUserProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose;
  }, [router.asPath]);

  return (
    <ModalPersistUserContext.Provider value={disclosure}>
      {children}
    </ModalPersistUserContext.Provider>
  );
}

export const usePersistUserModal = () => useContext(ModalPersistUserContext);
