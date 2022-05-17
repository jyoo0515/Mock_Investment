import { DataSource } from 'typeorm';
import request from 'supertest';
import app from '../src/app';
import Stock from '../src/entity/stock.entity';
import User from '../src/entity/user.entity';

beforeAll(async () => {
  const TestDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [User, Stock],
    synchronize: true,
    logging: false,
  });
  return new Promise<void>((resolve) =>
    TestDataSource.initialize().then(() => {
      console.log('Database initialized');
      resolve();
    })
  );
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe('[GET] /api/stocks', () => {
  test('should return list of stocks', async () => {
    const res = await request(app).get('/api/stocks/');
    expect(res.status).toBe(200);
  });
});
