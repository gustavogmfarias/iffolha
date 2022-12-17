import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  name: string;
  lastName: string;
  email: string;
  role: string;
  id: string;
  avatarUrl: string;
};

interface ModalPersistUserProviderProps {
  children: ReactNode;
}

type ModalPersistUserProviderData = {
  userToUpdate?: User;
  isUpdate: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setIsUpdate: (value: boolean) => void;
  setUserToUpdate: (user: User) => void;
};

const ModalPersistUserContext = createContext(
  {} as ModalPersistUserProviderData
);

export function ModalPersistUserProvider({
  children,
}: ModalPersistUserProviderProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [userToUpdate, setUserToUpdate] = useState<User>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    onClose;
  }, [router.asPath]);

  return (
    <ModalPersistUserContext.Provider
      value={{
        userToUpdate,
        isOpen,
        onClose,
        onOpen,
        isUpdate,
        setIsUpdate,
        setUserToUpdate,
      }}
    >
      {children}
    </ModalPersistUserContext.Provider>
  );
}

export const usePersistUserModal = () => useContext(ModalPersistUserContext);
