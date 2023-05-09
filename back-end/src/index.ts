import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import env from './Util/validateEnv'
import express, { Request, Response } from "express";

import { Products } from "./data";
import productRouter from './routes/productsRouter';





const app = express();

mongoose
  .connect(env.MONGODB_CONNECT)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(() => {
    console.log("cannot connect to mongodb")
  })


  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:5173'],
    })
  )


const port = env.PORT


app.use('/api/products', productRouter)

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
});