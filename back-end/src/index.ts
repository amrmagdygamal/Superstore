import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import env from './Util/validateEnv'
import express, {  } from "express";

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

app.use(express.json())


const port = env.PORT


app.use('/api/products', productRouter);
app.use('/api/users', userRouter)

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
});