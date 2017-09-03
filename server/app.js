import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import index from './routes/index';

const App = express();

App.use(logger('dev'));
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

App.use('/api', index);
App.get('/', (req, res, next) => res.redirect('/api'));
App.get('*', (req, res, next) => next());

// catch 404 and forward to error handler
App.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
App.use((err, req, res, next) => {
  // render the error
  res.status(err.status).send({
    status: err.status,
    message: err.message
  });
});

export default App;
