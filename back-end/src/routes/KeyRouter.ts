
import express from 'express';
import validateEnv from '../Util/validateEnv';

export const KeyRouter = express.Router();

KeyRouter.get('/paypal', (req, res) => {
  res.json({ clientID: validateEnv.PAYPAL_CLIENT_ID})
})