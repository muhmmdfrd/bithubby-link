import * as dotenv from 'dotenv';
import express from 'express';
import * as bodyParser from 'body-parser';
import { urlShortenRouter } from './src/routes';
import { db } from './db';
import { UrlShortenController } from './src/controllers';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use('/api/url-shorten', urlShortenRouter);
app.use('/api/test', function (req, res, next) {
  res.status(200).json({ message: 'OK' });
});
app.use('/:code', function (req, res, next) {
  const code = req.baseUrl.replace('/', '');

  if (code) {
    const controller = new UrlShortenController();
    controller
      .getByCode(code)
      .then((response) => {
        if (response == null) {
          res.status(500).json({ message: 'Not Found' });
          return;
        }
        res.redirect(response.url ?? '');
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }
});

app.listen(process.env.PORT, async () => {
  console.log(`Node server started running at ${process.env.PORT}`);
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
