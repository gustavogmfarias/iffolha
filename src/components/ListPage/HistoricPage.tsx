import { Box, Link, Text } from "@chakra-ui/react"

interface IRequest {
  name: string
  link: string
  lastPage?: boolean
}

export default function HistoricPage({ name, link, lastPage }: IRequest) {
  return (
    <Box>
      <Link href={link}>
        <Text fontSize="sm" mt="2">
          {name} {!lastPage && ">"}
        </Text>
      </Link>
    </Box>
  )
}
