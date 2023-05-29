import 'dotenv/config';
import mongoose from 'mongoose';
import env from './Util/validateEnv';
import express, { NextFunction, Request, Response } from 'express';

import productRouter from './routes/productsRouter';
import { userRouter } from './routes/userRouter';
import cors from 'cors';
import orderRouter from './routes/orderRouter';
import { KeyRouter } from './routes/KeyRouter';
import createHttpError, { isHttpError } from 'http-errors';



const port = env.PORT;

mongoose.set('strictQuery', true);
mongoose
  .connect(env.MONGODB_CONNECT)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(() => {
    console.log('cannot connect to mongodb');
  });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/keys', KeyRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage});
});



app.listen(port, () => {
  console.log(`server started at Port: ${port}`);
});
