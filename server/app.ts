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

app.get('/', (request, response) => {
  response.json({ message: 'Hello world!!!' });
});

app.use('/api/media', mediaRouter);
app.use('/api/category', categoryRouter);
app.use('/api/words', wordRouter);
app.use('/api/auth', authRouter);

export { app };
