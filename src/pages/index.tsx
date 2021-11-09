import { Flex } from "@chakra-ui/react";
import { ClubSearchInput } from "../components/ClubSearchInput";
import { ClubSearchProvider } from "../components/ClubSearchProvider";
import { ClubSearchTable } from "../components/ClubSearchTable";

import { Layout } from "../components/Layout/Layout";

const ClubSearchPage = () => {
  return (
    <Layout>
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <ClubSearchProvider>
          <ClubSearchInput />
          <ClubSearchTable />
        </ClubSearchProvider>
      </Flex>
    </Layout>
  );
};

export default ClubSearchPage;
