import express, { Request, Response } from "express";
import { Products } from "./data";

const app = express();

app.get('/api/prodcuts', (req: Request, res: Response) => {
  res.json(Products)
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})