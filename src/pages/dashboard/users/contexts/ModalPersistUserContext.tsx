import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ModalPersistUserProviderProps {
  children: ReactNode;
}

type ModalPersistUserProviderData = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  status: string;
  setStatus: (status: string) => void;
};

const ModalPersistUserContext = createContext(
  {} as ModalPersistUserProviderData
);

export function ModalPersistUserProvider({
  children,
}: ModalPersistUserProviderProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [status, setStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    onClose;
  }, [router.asPath]);

  return (
    <ModalPersistUserContext.Provider
      value={{ isOpen, onClose, onOpen, status, setStatus }}
    >
      {children}
    </ModalPersistUserContext.Provider>
  );
}

export const usePersistUserModal = () => useContext(ModalPersistUserContext);
