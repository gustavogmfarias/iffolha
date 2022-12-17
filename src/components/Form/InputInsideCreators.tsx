import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  value?: string;
  label?: string;
  error?: FieldError;
  type?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, value, type, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        type={type}
        value={value}
        focusBorderColor="project.text"
        bgColor="project.main_lighter"
        color="blackAlpha.500"
        _hover={{
          bgColor: "white",
        }}
        size="lg"
        ref={ref}
        {...rest}
      />
      {!!error && (
        <FormErrorMessage color="green">{error.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export const InputInsideCreator = forwardRef(InputBase);
