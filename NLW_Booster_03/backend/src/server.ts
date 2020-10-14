import express from "express";
import cors from "cors";
import routes from "./routes";
import path from "path";

import "express-async-errors";
import "./database/connection";

import errorHandler from "./errors/handler";

const server = express();

server.use(cors());
server.use(express.json());

server.use(routes);
server.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

server.use(errorHandler);

server.listen(3333, () => {
  console.log("Server listening on port 3333");
});
