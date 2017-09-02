import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import index from './routes/index';

const App = express();

App.use(logger('dev'));
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

App.use('/api', index);
App.get('*', (req, res, next) => res.send('Home!'));

// catch 404 and forward to error handler
App.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
App.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.App.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default App;
