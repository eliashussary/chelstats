const API_BASE = "/api/nhl";

const qsStringify = (query: Record<string, string>) =>
  new URLSearchParams(query).toString();

export const URLs = {
  ClubSearch: API_BASE + "/clubs/search",
  ClubInfo: API_BASE + "/clubs/info",
  ClubStats: API_BASE + "/clubs/stats",
  MembersStats: API_BASE + "/members/stats",
} as const;

export const PlatformOptions = {
  PS5: { name: "PS5", value: "ps5" },
  PS4: { name: "PS4", value: "ps4" },
  XXS: { name: "Xbox X/S", value: "xbox-series-xs" },
  XB1: { name: "Xbox One", value: 'xboxone"' },
} as const;

interface BaseQuery extends Record<string, string> {
  platform: string;
}

export interface ClubIdQuery extends BaseQuery {
  clubId: string;
}

export interface ClubNameQuery extends BaseQuery {
  clubName: string;
}

export type Platform =
  typeof PlatformOptions[keyof typeof PlatformOptions]["value"];

// https://proclubs.ea.com/api/nhl/members/stats?platform=ps4&clubId=123
export const getMembersStatsUrl = (query: ClubIdQuery) => {
  return `${URLs.MembersStats}?${qsStringify(query)}`;
};

export const fetchMembersStats = (query: ClubIdQuery) => {
  return fetch(getMembersStatsUrl(query)).then((res) => res.json());
};

// https://proclubs.ea.com/api/nhl/clubs/search?platform=ps4&clubName=mysearch
export const getClubSearchUrl = (query: ClubNameQuery) => {
  return `${URLs.ClubSearch}?${qsStringify(query)}`;
};

export const fetchClubSearch = ({ platform, clubName }: ClubNameQuery) => {
  return fetch(getClubSearchUrl({ platform, clubName })).then((res) =>
    res.json()
  );
};

export const getClubInfo = (query: ClubIdQuery) => {
  return `${URLs.ClubInfo}?${qsStringify(query)}`;
};

export const fetchClubInfo = (query: ClubIdQuery) => {
  return fetch(getClubInfo(query)).then((res) => res.json());
};

export const getClubStats = (query: ClubIdQuery) => {
  return `${URLs.ClubStats}?${qsStringify(query)}`;
};

export const fetchClubStats = (query: ClubIdQuery) => {
  return fetch(getClubStats(query)).then((res) => res.json());
};
