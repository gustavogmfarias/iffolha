import { Stack, Button, Box, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PagionationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  page: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 5;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange,
  page,
}: PagionationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];
  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      {page === 1 ? (
        <Box>
          <strong>1</strong> - <strong>{registerPerPage}</strong> de{" "}
          <strong>{totalCountOfRegisters}</strong>{" "}
        </Box>
      ) : (
        <Box>
          {" "}
          <strong>{currentPage * registerPerPage - 9}</strong> -{" "}
          <strong>{(currentPage % registerPerPage) * registerPerPage}</strong>{" "}
          de <strong>{totalCountOfRegisters}</strong>{" "}
        </Box>
      )}

      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                number={page}
                key={page}
              />
            );
          })}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                number={page}
                key={page}
              />
            );
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}

            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  );
}