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

  const data = await fetch(EA_BASE_URL + req.url).then((res) => res.json());
  res.status(200).json(data);
}
