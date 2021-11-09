import React, { useState, createContext, useContext } from "react";
import { useQuery } from "react-query";

import { fetchClubSearch, Platform, PlatformOptions } from "../lib/ea-api";

const noop = (...args: any) => {};

interface ClubSearchContext {
  data: any;
  isLoading: boolean;
  clubname: string;
  platform: Platform;
  handleOnClubnameChange: (val: string) => void;
  handleOnPlatformChange: (val: string) => void;
  handleOnSubmit: (event: React.SyntheticEvent) => void;
}

const Context = createContext<ClubSearchContext>({
  data: {},
  isLoading: false,
  clubname: "",
  platform: PlatformOptions.PS5.value,
  handleOnClubnameChange: noop,
  handleOnPlatformChange: noop,
  handleOnSubmit: noop,
});

export const ClubSearchProvider = ({ children }) => {
  const [platform, setPlatform] = useState<Platform>(PlatformOptions.PS5.value);
  const [clubname, setClubname] = useState("");

  const { refetch, isFetching, data } = useQuery(
    ["club", platform, clubname],
    () => fetchClubSearch(platform, clubname),
    {
      enabled: false,
    }
  );

  const handleOnClubnameChange = (val: string) => setClubname(val);

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
        clubname,
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
