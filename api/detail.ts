import { search, detail } from "../utils/index";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { path } = req.query;

  const results = await detail(path);
  return res.json(results);
};
