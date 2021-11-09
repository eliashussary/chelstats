const API_BASE = "/api/nhl";

export const URLs = {
  ClubSearch: API_BASE + "/clubs/search",
  MembersStats: API_BASE + "/members/stats",
} as const;

export const PlatformOptions = {
  PS5: { name: "PS5", value: "ps5" },
  PS4: { name: "PS4", value: "ps4" },
  XXS: { name: "Xbox X/S", value: "xbox-series-xs" },
  XB1: { name: "Xbox One", value: 'xboxone"' },
} as const;

export type Platform =
  typeof PlatformOptions[keyof typeof PlatformOptions]["value"];

// https://proclubs.ea.com/api/nhl/members/stats?platform=ps4&clubId=123
export const getMembersStatsUrl = (platform: Platform, clubId: string) => {
  return `${URLs.MembersStats}?platform=${platform}&clubId=${encodeURI(
    clubId
  )}`;
};

// https://proclubs.ea.com/api/nhl/clubs/search?platform=ps4&clubName=mysearch
export const getClubSearchUrl = (platform: Platform, clubName: string) => {
  return `${URLs.ClubSearch}?platform=${platform}&clubName=${encodeURI(
    clubName
  )}`;
};

export const fetchMembersStats = (platform: Platform, clubId: string) => {
  return fetch(getMembersStatsUrl(platform, clubId)).then((res) => res.json());
};

export const fetchClubSearch = (platform: Platform, clubName: string) => {
  return fetch(getClubSearchUrl(platform, clubName)).then((res) => res.json());
};
