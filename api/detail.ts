import { search, detail } from "../utils/index";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { id } = req.query;

  const results = await detail(id);
  return res.json(results);
};
