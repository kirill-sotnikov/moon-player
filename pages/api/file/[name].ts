import { readFile } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer | "ERROR">
) {
  return new Promise((resolve, reject) => {
    readFile(`music/${req.query.name}/${req.query.file}`, (error, data) => {
      if (error) {
        reject(res.status(500).send("ERROR"));
      }
      if (data) {
        resolve(res.status(200).send(data));
      }
    });
  });
}
