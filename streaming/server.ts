import express, { Request, Response, NextFunction } from "express";
import fs from "fs";

const app = express();
app.use(express.json());
const env: string = process.env.NODE_ENV || "local";

const config = JSON.parse(
  fs.readFileSync(`./environments/${env}.json`).toString()
);
app.get("/streaming", (req, res) => {
  let response = {
    data: {
      items: [
        {
          id: 1,
          name: "list 1",
        },
        {
          id: 2,
          name: "oredr 2",
        },
      ],
    },
  };
  res.status(200).json(response);
});
app.listen(config.port, () => {
  console.log("server is running");
});
