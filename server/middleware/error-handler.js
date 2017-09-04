/**
 * Error Handler
 * @param  {object}   err  error stack
 * @param  {object}   req  request to server
 * @param  {object}   res  response from server
 * @param  {Function} next callback function
 * @return {object}        server response
 */
function errorHandler(err, req, res, next) {
  const error = process.env.NODE_ENV !== 'development' ? undefined : err;
  res.status(err.status || 500)
    .send({
      message: err.message,
      error
    });
}

/**
 * Page Not Found
 * @param  {object}   req  response to server
 * @param  {object}   res  response from server
 * @param  {Function} next callback function
 * @return {object}        throw error
 */
function pageNotFound(req, res, next) {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
}

/**
 * Fake Internal Server Error
 * @param  {object}   req  request to server
 * @param  {object}   res  response from server
 * @param  {Function} next callback function
 * @return {object}        throw error
 */
function fakeServerError(req, res, next) {
  const error = new Error('Internal Server Error');
  next(error);
}

export {
  errorHandler,
  pageNotFound,
  fakeServerError
};
