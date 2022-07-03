import express, { Request, Response, NextFunction } from "express";
import fs from "fs";

const app = express();
app.use(express.json());
const env: string = process.env.NODE_ENV || "local";

const config = JSON.parse(
  fs.readFileSync(`./environments/${env}.json`).toString()
);
app.listen(config.port, () => {
  console.log('server is running');
});
