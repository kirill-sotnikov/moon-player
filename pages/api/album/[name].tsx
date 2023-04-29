import { exec } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  // const data = readFileSync(`music/${req.query.name}`);
  return new Promise((resolve, reject) => {
    exec(`ls music/${req.query.name}`, (error, stdout, stdin) => {
      if (stdout) {
        resolve(res.status(200).json(stdout.split("\n")));
      } else {
        reject(res.status(500).send(["ERROR"]));
      }
    });
  });
}
