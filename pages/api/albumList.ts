import { exec } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  exec("ls music/", (error, stdout, stdin) => {
    if (stdout) {
      res.status(200).json(stdout.split("\n"));
    }
  });
}
