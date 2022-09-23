require("dotenv").config();
import express from "express";
import cors from "cors";
import dataSource from "./utils";
import mainRouter from "./controllers";

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN,
  })
);
app.use(express.json());

app.use("/api", mainRouter);

const start = async (): Promise<void> => {
  await dataSource.initialize();
  app.listen(port, (): void =>
    console.log(`Server is listening on port ${port}`)
  );
};

start();
