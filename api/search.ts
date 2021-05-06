import { search } from "../utils/index";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { query, page } = req.query;
  const data = await search(query, page as any);

  return res.json(data);
};
