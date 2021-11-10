import React, { useState, createContext, useContext } from "react";
import { useQuery } from "react-query";

import { fetchClubSearch, Platform, PlatformOptions } from "../lib/ea-api";

const noop = (...args: any) => {};

interface ClubSearchContext {
  data: any;
  isFetched: boolean;
  isLoading: boolean;
  clubName: string;
  platform: Platform;
  handleOnClubnameChange: (val: string) => void;
  handleOnPlatformChange: (val: string) => void;
  handleOnSubmit: (event: React.SyntheticEvent) => void;
}

const Context = createContext<ClubSearchContext>({
  data: {},
  isFetched: false,
  isLoading: false,
  clubName: "",
  platform: PlatformOptions.PS5.value,
  handleOnClubnameChange: noop,
  handleOnPlatformChange: noop,
  handleOnSubmit: noop,
});

export const ClubSearchProvider = ({ children }) => {
  const [platform, setPlatform] = useState<Platform>(PlatformOptions.PS5.value);
  const [clubName, setclubName] = useState("");

  const { refetch, isFetching, isFetched, data } = useQuery(
    ["club", platform, clubName],
    () => fetchClubSearch({ platform, clubName }),
    {
      enabled: false,
    }
  );

  const handleOnClubnameChange = (val: string) => setclubName(val);

  const handleOnPlatformChange = (val: Platform) => setPlatform(val);

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <Context.Provider
      value={{
        data,
        isLoading: isFetching,
        isFetched,
        clubName,
        platform,
        handleOnClubnameChange,
        handleOnPlatformChange,
        handleOnSubmit,
      }}
    >
      {children}
    </Context.Provider>
  );
};

ClubSearchProvider.Context = Context;
