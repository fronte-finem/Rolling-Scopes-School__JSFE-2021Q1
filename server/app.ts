import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';

import { authRouter } from './routers/auth';
import { categoryRouter } from './routers/category';
import { mediaRouter } from './routers/media';
import { wordRouter } from './routers/word';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: process.env.AUTH_SECRET || 'not secret',
    saveUninitialized: true,
    resave: false,
  })
);

enum AppRoute {
  BASE = '/',
  AUTH = '/api/auth',
  CATEGORY = '/api/category',
  WORDS = '/api/words',
  MEDIA = '/api/media',
}

app.get(AppRoute.BASE, (_, response) => {
  response.send('Hello world!!!');
});

app.use(AppRoute.AUTH, authRouter);
app.use(AppRoute.CATEGORY, categoryRouter);
app.use(AppRoute.WORDS, wordRouter);
app.use(AppRoute.MEDIA, mediaRouter);

export { app };
