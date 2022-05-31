import { Flex, Text, Icon, Link } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

interface IRequest {
  name?: string;
  link?: string;
}

export function NavLink({ name, link }: IRequest) {
  return (
    <Flex
      w="40"
      flexDirection="row"
      align="center"
      justify="space-between"
      fontWeight="bold"
      p="2"
    >
      <Icon as={FaUser} fontSize="12" color="project.text" />
      <Link>
        <Text mr="10" fontSize="12" color="project.text">
          {name}
        </Text>
      </Link>
    </Flex>
  );
}
