import {
  Input,
  Box,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { PlatformOptions } from "../lib/ea-api";
import { ClubSearchProvider } from "./ClubSearchProvider";

export const ClubSearchInput = () => {
  const {
    isLoading,
    clubname,
    platform,
    handleOnClubnameChange,
    handleOnPlatformChange,
    handleOnSubmit,
  } = useContext(ClubSearchProvider.Context);
  return (
    <Box width="lg" maxW="lg">
      <form onSubmit={handleOnSubmit}>
        <FormControl my={5}>
          <RadioGroup defaultValue={platform} onChange={handleOnPlatformChange}>
            <Stack spacing={4} direction="row">
              {Object.values(PlatformOptions).map((v) => (
                <Radio key={v.value} value={v.value}>
                  {v.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl my={5}>
          <FormLabel>Search by Club Name</FormLabel>
          <InputGroup>
            <Input
              placeholder="Search by Club Name"
              onChange={(e) => {
                handleOnClubnameChange(e.target.value);
              }}
              value={clubname}
              size="lg"
            />
            <Button
              size="lg"
              variant="solid"
              colorScheme="black"
              onClick={handleOnSubmit}
              type="submit"
              isLoading={isLoading}
            >
              Search
            </Button>
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  );
};
