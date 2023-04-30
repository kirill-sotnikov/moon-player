import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  // const data = readFileSync(`music/${req.query.name}`);

  return new Promise((resolve, reject) => {
    fs.readdir(`music/${req.query.name}`, (err, files) => {
      if (err) {
        reject(res.status(500).send([]));
      }

      resolve(
        res
          .status(200)
          .json(
            files.filter(
              (item) => item !== ".DS_Store" && !item.includes(".jpeg")
            )
          )
      );
    });
  });
}
