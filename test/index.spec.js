import request from 'supertest';
import app from '../server/app';

describe('Base Route - GET /', () => {
  test('redirects to the right path', () =>
    request(app)
      .get('/')
      .expect('Location', '/api')
  );
  test('should respond with message `Home Page!`', () =>
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toMatchObject({
          msg: 'Home Page!'
        });
      })
  );
});

describe('Error Handling', () => {
  test('should respond with status code 404 `Page Not Found` for invalid route', () =>
    request(app)
      .get('/404')
      .expect(404, {
        message: 'Page Not Found'
      })
  );
  test('should respond with status code 500 - `Internal Server Error`', () =>
    request(app)
      .get('/500')
      .expect(500, {
        message: 'Internal Server Error'
      })
  );
});
