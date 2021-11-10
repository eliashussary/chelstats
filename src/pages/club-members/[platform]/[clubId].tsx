import { useContext, useMemo } from "react";
import { Flex, Link } from "@chakra-ui/react";
import { Column } from "react-table";
import { useQuery } from "react-query";
import NextLink from "next/link";
import { Layout } from "../../../components/Layout/Layout";
import { useRouter } from "next/dist/client/router";
import { ClubIdQuery, fetchMembersStats } from "../../../lib/ea-api";
import { DataTable } from "../../../components/DataTable";

const ClubSearchPage = () => {
  const { query } = useRouter();
  const { platform, clubId } = query;

  const { data, isLoading } = useQuery(["club_members", platform, clubId], () =>
    fetchMembersStats({ platform, clubId } as ClubIdQuery)
  );

  const columns = useMemo(() => {
    const members = data?.members;
    if (!members) return [];
    return [
      {
        Header: "Stat",
        accessor: "stat",
        Cell: ({ value }) => <strong>{value}</strong>,
      },
    ].concat(
      members.map((member) => {
        return {
          Header: member.name,
          accessor: member.name,
          isNumeric: true,
        };
      })
    );
  }, [data]);

  const tableData = useMemo(() => {
    const members = data?.members;
    if (!members) return [];
    const [firstRow] = members;
    const stats = Object.keys(firstRow);
    const rows = [];

    for (const stat of stats) {
      const row = { stat };
      for (const member of members) {
        Object.assign(row, {
          [member.name]: member[stat],
        });
      }
      rows.push(row);
    }
    return rows;
  }, [data]);

  return (
    <Layout>
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <DataTable data={tableData} columns={columns} />
      </Flex>
    </Layout>
  );
};

export default ClubSearchPage;
