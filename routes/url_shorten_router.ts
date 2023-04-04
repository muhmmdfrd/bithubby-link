import express, { Request, Response } from "express";
import { initModels } from "../models/init-models";
import { db } from "../db";

const app = express.Router();

app.get("/", async (request: Request, response: Response) => {
  const urlShorts = await initModels(db).url_short.findAll();
  response.status(200).json({ message: "data found.", data: urlShorts });
});

export default app;
