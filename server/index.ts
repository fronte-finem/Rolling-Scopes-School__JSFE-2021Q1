import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { app } from './app';

dotenv.config();

const APP_PORT = process.env.PORT || '12321';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

const mongodbOptions: mongoose.ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose
  .connect(MONGO_URI, mongodbOptions)
  .then(() => console.log('Connected to mongo database'))
  .catch((error) => console.log('Error on connect to mongo database', error));

const logStart = (port: string) => () => console.log(`Server started on port: ${port}`);

app.listen(APP_PORT, logStart(APP_PORT));
