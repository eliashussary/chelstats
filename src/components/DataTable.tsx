import { useMemo } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Box } from "@chakra-ui/react";
import { useTable, useSortBy, Column } from "react-table";
import { isNumeric } from "../lib/util";
import { ClubSearchProvider } from "./ClubSearchProvider";

interface DataTableProps {
  data: any;
  columns?: Column[];
}

export const DataTable = (props: DataTableProps) => {
  const { columns: columnsFromProps, data } = props;

  const columns = useMemo(() => {
    if (columnsFromProps) return columnsFromProps;
    const firstRow = data?.[0];
    if (!firstRow) return [];
    return Object.entries(firstRow).map((entry) => {
      const [key, value] = entry;

      return {
        Header: key,
        accessor: key,
        isNumeric: isNumeric(value),
        isObject: typeof value === "object",
      };
    });
  }, [data, columnsFromProps]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <Box maxW="container.xl" width="100%" overflowX="auto" my={5}>
        <Table {...getTableProps()} size="sm" overflowX={"scroll"}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()} isNumeric={column.isNumeric}>
                    {column.render("Header")}
                    <chakra.span pl="4"></chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    if (cell.column.isObject) return null;

                    return (
                      <Td
                        {...cell.getCellProps()}
                        isNumeric={cell.column.isNumeric}
                      >
                        {cell.render("Cell")}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};
