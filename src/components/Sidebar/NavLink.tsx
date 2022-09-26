import { Flex, Text, Icon, Link } from "@chakra-ui/react"
import { RiUser3Line } from "react-icons/ri"

interface IRequest {
  name?: string
  link?: string
  iconName?: string
}

export function NavLink({ name, link, iconName }: IRequest) {
  return (
    <Flex w="40" flexDirection="row" align="center" fontWeight="bold" p="2">
      <Icon as={RiUser3Line} fontSize="12" color="project.text" mr="5" />
      <Link href={link}>
        <Text mr="10" fontSize="12" color="project.text">
          {name}
        </Text>
      </Link>
    </Flex>
  )
}
