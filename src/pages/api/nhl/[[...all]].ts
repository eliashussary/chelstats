import { NextApiRequest, NextApiResponse } from "next";
import { URLs } from "../../../lib/ea-api";

const EA_BASE_URL = process.env.EA_BASE_URL;

const WHITELIST_URLS = Object.values(URLs);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqUrl = req.url;
  const isValidUrl = WHITELIST_URLS.some((whitelistUrl) =>
    reqUrl.includes(whitelistUrl)
  );

  if (req.method !== "GET" || !isValidUrl)
    return res.status(403).send("forbidden");

  const eaUrl = EA_BASE_URL + req.url;

  const data = await fetch(eaUrl, {
    method: "GET",
    headers: {
      "user-agent": req.headers["user-agent"],
      accept: "application/json",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
    },
  }).then((res) => res.json());
  res.status(200).json(data);
}
