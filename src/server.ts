import app from "./app";
import http from "http";
import logger from "./lib/logger";
import dotenv from "dotenv";
const path =
  process.env.NODE_ENV === "development" ? ".env.development.local" : undefined;
dotenv.config({ path: path });

const server = http.createServer(app);

server.listen(3000, () => {
  logger.info("Server is running");
});
