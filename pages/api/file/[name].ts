import { readFile } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer | "ERROR">
) {
  return readFile(
    `music/${req.query.name}/${req.query.file}`,
    (error, data) => {
      if (error) {
        res.status(500);
      }
      if (data) {
        res.status(200).send(data);
      }
    }
  );
}
