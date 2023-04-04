import * as dotenv from 'dotenv';
import express from 'express';
import * as bodyParser from 'body-parser';
import { urlShortenRouter } from './src/routes';
import { db } from './db';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use('/url-shorten', urlShortenRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Node server started running at ${process.env.PORT}`);
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
