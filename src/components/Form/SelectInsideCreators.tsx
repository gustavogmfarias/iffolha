import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Select,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";

interface SelectProps {
  name: string;
  label?: string;
  children: ReactNode;
  error?: FieldError;
}

const SelectProps: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, error = null, children, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <Select
        bgColor="project.main_lighter"
        name={name}
        focusBorderColor="project.text"
        id={name}
        color="blackAlpha.500"
        _hover={{
          bgColor: "white",
        }}
        size="lg"
        ref={ref}
        {...rest}
      >
        {children}
      </Select>
      {!!error && (
        <FormErrorMessage color="green">{error.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export const SelectInsideCreators = forwardRef(SelectProps);
