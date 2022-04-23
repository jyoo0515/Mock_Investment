import request from 'supertest';
import app from '../src/app';

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe('Get /', () => {
  test('status to be 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });
});
