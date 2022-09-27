import { Box, Link, LinkProps, Text } from "@chakra-ui/react";

interface IRequest extends LinkProps {
  name: string;
  link: string;
  lastPage?: boolean;
}

export default function HistoricPage({
  name,
  link,
  lastPage = false,
  ...rest
}: IRequest) {
  return (
    <Box>
      <Link href={link} {...rest}>
        <Text fontSize="sm" mt="2">
          {name} {!lastPage && ">"}
        </Text>
      </Link>
    </Box>
  );
}
