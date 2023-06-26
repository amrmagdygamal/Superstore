
import express from 'express';

export const KeyRouter = express.Router();

KeyRouter.get('/paypal', (req, res) => {
  res.json({ clientID: process.env.PAYPAL_CLIENT_ID})
})