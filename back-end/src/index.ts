import 'dotenv/config';
import mongoose from 'mongoose';
import env from './Util/validateEnv';
import express from 'express';

import productRouter from './routes/productsRouter';
import { userRouter } from './routes/userRouter';
import cors from 'cors';
import orderRouter from './routes/orderRouter';

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

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
