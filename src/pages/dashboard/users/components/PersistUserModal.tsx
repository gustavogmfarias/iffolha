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
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { InputInsideCreator } from "../../../../components/Form/InputInsideCreators";

type ModalPersistUserProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export default function PersistUserModal({
  isOpen,
  onClose,
  onOpen,
}: ModalPersistUserProps) {
  return (
    <Modal isCentered onOpen={onOpen} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalHeader>Criar usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form">
            <Stack>
              <InputInsideCreator
                label="Nome:"
                name="name"
                type="text"
              ></InputInsideCreator>
              <InputInsideCreator
                label="E-mail:"
                name="email"
                type="email"
              ></InputInsideCreator>
              <InputInsideCreator
                label="Senha:"
                name="password"
                type="password"
              ></InputInsideCreator>

              <Select
                placeholder="Escolha um Papel"
                bgColor="project.main_lighter"
              >
                <option value="option1">Admin</option>
                <option value="option2">User</option>
                <option value="option3">Editor</option>
                <option value="option3">Author</option>
              </Select>
            </Stack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={onClose} colorScheme="green">
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
