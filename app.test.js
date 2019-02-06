const request = require('supertest');
const app = require('./app');

describe('Test the root route', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(302);
  });
});

describe('Test the users route', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the login route', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/login');
    expect(response.statusCode).toBe(200);
  });
});
