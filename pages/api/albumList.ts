import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  // const data = readFileSync(`music/${req.query.name}`);

  return new Promise((resolve, reject) => {
    fs.readdir("music/", (err, files) => {
      console.log("FILES!!!!!");
      if (err) {
        reject(err);
      }

      resolve(
        res.status(200).json(files.filter((item) => item !== ".DS_Store"))
      );
    });
  });
}
