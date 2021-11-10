import { useContext, useMemo } from "react";
import { Flex, Link, Heading } from "@chakra-ui/react";
import { Column } from "react-table";
import NextLink from "next/link";
import { ClubSearchInput } from "../components/ClubSearchInput";
import { ClubSearchProvider } from "../components/ClubSearchProvider";
import { DataTable } from "../components/DataTable";

import { Layout } from "../components/Layout/Layout";

const ClubSearchTable = () => {
  const ctx = useContext(ClubSearchProvider.Context);

  const columns = useMemo(() => {
    return [
      {
        Header: "Name",
        accessor: "name",
        minWidth: 250,
      },
      {
        Header: "Record",
        accessor: "record",
      },
      {
        Header: "Division",
        accessor: "currentDivision",
      },
      {
        Header: "View Club Members",
        accessor: "clubId",
        Cell: ({ value }) => {
          return (
            <Link as={NextLink} href={`/club-members/${ctx.platform}/${value}`}>
              View Members
            </Link>
          );
        },
      },
    ] as Column[];
  }, [ctx.platform]);

  const data = useMemo(() => {
    if (!ctx.data) return [];
    return Object.values(ctx.data);
  }, [ctx]);

  if (!ctx.isFetched) return null;

  if (data.length === 0 && ctx.isFetched)
    return (
      <Heading as="p" size="sm">
        No Results Found
      </Heading>
    );

  return <DataTable data={data} columns={columns} />;
};

const ClubSearchPage = () => {
  return (
    <ClubSearchProvider>
      <Layout>
        <Flex justify={"center"} align={"center"} direction={"column"}>
          <ClubSearchInput />
          <ClubSearchTable />
        </Flex>
      </Layout>
    </ClubSearchProvider>
  );
};

export default ClubSearchPage;
