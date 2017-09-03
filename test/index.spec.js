import request from 'supertest';
import app from '../server/app';

describe('Base Route - GET /', () => {
  test('should respond with message `Home!`', () =>
    request(app)
      .get('/')
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
