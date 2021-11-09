import { useContext, useMemo } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import { toNumber, isNumber } from "lodash";
import { ClubSearchProvider } from "./ClubSearchProvider";

const isNumeric = (val) => {
  const num = toNumber(val);
  const isNan = Number.isNaN(num);
  if (isNan) return false;
  if (typeof num === "number") return true;
  return false;
};

export const ClubSearchTable = () => {
  const ctx = useContext(ClubSearchProvider.Context);
  const responseData = ctx.data;

  const data = useMemo(() => {
    if (!responseData) return [];
    return Object.values(responseData);
  }, [responseData]);

  const columns = useMemo(() => {
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
  }, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <Table
        {...getTableProps()}
        size="sm"
        maxW="container.xl"
        overflowX={"scroll"}
      >
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
      <pre>{JSON.stringify(ctx, null, "\t")}</pre>
    </>
  );
};
