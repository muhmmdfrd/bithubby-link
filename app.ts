import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { urlShortenRouter } from './src/routes';
import { db } from './db';

const app = express();
dotenv.config();

app.use(bodyParser.json());

app.get('/', function (req, res, next) {
  res.status(200).json('OK');
});
app.use('/api/url-shorten', urlShortenRouter);
app.use('/api/test', function (req, res, next) {
  res.status(200).json('OK');
});

app.listen(process.env.PORT, async () => {
  console.log(`Node server started running at ${process.env.PORT}`);
  try {
    await db.sync();
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
