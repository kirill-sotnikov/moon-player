import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>
) {
  const data = readFileSync(`music/${req.query.name}`);
  res.status(200).send(data);
}
