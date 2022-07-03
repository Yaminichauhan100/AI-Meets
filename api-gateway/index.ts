import gateway from "fast-gateway";
import fs from "fs";
const env: string = process.env.NODE_ENV || "local";

const config = JSON.parse(fs.readFileSync(`./environments/${env}.json`).toString()
);
const server = gateway({
  routes: config.services,
});
server.start(config.port).then((server) => {
  console.log(`API gateway is running on ${config.port} port`);
});
