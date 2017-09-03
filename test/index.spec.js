import request from 'supertest';
import app from '../server/app';

describe('Base Route - GET /', () => {
  test('redirects to the right path', () =>
    request(app)
      .get('/')
      .then((res) => {
        expect(res.header.location).toBe('/api');
      })
  );
  test('should respond with message `Home!`', () =>
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
  test('should respond with `404 - Not Found` for invalid route', () =>
    request(app)
      .get('/home')
      .expect(404)
      .then((res) => {
        expect(res.body).toMatchObject({
          status: 404,
          message: 'Not Found'
        });
      })
  );
});
