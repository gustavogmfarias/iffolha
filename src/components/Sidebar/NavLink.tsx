import {
  Flex,
  Text,
  Icon,
  Link as ChakraLink,
  LinkProps,
} from "@chakra-ui/react";
import Link from "next/link";
import { ElementType } from "react";

interface IRequest extends LinkProps {
  name?: string;
  link?: string;
  iconName?: ElementType;
  onMouseClick?: () => void;
}

export function NavLink({
  name,
  link,
  iconName,
  onMouseClick,
  ...rest
}: IRequest) {
  return (
    <Flex w="40" flexDirection="row" align="center" fontWeight="bold" p="2">
      <Icon as={iconName} fontSize="12" color="project.text" mr="5" />

      {!!link ? (
        // <Link href={link} passHref>
        <ChakraLink href={link} {...rest} onClick={onMouseClick}>
          <Text mr="10" fontSize="12" color="project.text">
            {name}
          </Text>
        </ChakraLink>
      ) : (
        // </Link>
        <ChakraLink {...rest} onClick={onMouseClick}>
          <Text mr="10" fontSize="12" color="project.text">
            {name}
          </Text>
        </ChakraLink>
      )}
    </Flex>
  );
}
