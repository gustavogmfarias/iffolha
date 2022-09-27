import { Flex, Text, Icon, Link, LinkProps } from "@chakra-ui/react";
import { ElementType } from "react";

interface IRequest extends LinkProps {
  name?: string;
  link?: string;
  iconName?: ElementType;
}

export function NavLink({ name, link, iconName, ...rest }: IRequest) {
  return (
    <Flex w="40" flexDirection="row" align="center" fontWeight="bold" p="2">
      <Icon as={iconName} fontSize="12" color="project.text" mr="5" />
      <Link href={link} {...rest}>
        <Text mr="10" fontSize="12" color="project.text">
          {name}
        </Text>
      </Link>
    </Flex>
  );
}
