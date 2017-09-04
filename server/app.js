import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {
  errorHandler,
  pageNotFound,
  fakeServerError
} from './middleware/error-handler';

import index from './routes/index';

// initialize environment variable
dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', index);
app.get('/500', fakeServerError);
app.get('/', (req, res) => res.redirect('/api'));
app.get('*', (req, res, next) => next());

// catch 404 and forward to error handler
app.use(pageNotFound);

// error handler
app.use(errorHandler);

export default app;
