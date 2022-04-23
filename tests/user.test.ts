import { DataSource } from 'typeorm';
import request from 'supertest';
import app from '../src/app';
import User from '../src/entity/user.entity';

interface userCreateDTO {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface userLoginDTO {
  username: string;
  password: string;
}

beforeAll(async () => {
  const TestDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [User],
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

describe('[GET] /api/users/unique/:username', () => {
  test('should return boolean', async () => {
    const res = await request(app).get('/api/users/unique/test');
    expect(res.status).toBe(200);
    expect(res.body.unique).toBe(true || false);
  });
});

describe('[POST] /api/users/register', () => {
  test('should add a user to db', async () => {
    const userData: userCreateDTO = {
      username: 'test',
      password: 'test',
      firstName: 'John',
      lastName: 'Doe',
    };
    const res = await request(app).post('/api/users/register').send(userData);
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 1, username: 'test', firstName: 'John', lastName: 'Doe' });
  });
});

describe('[POST] /api/users/login', () => {
  test('should create a cookie with access token', async () => {
    const userData: userLoginDTO = {
      username: 'test',
      password: 'test',
    };
    const res = await request(app).post('/api/users/login').send(userData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ loginSuccess: true, message: 'Logged in' });
  });
});

describe('[GET] /api/users', () => {
  test('status to be 401 when not logged in', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(401);
  });
});

describe('[GET] /api/users/logout', () => {
  test('status to be 401 when not logged in', async () => {
    const res = await request(app).get('/api/users/logout').withCredentials();
    expect(res.status).toBe(401);
  });
});

describe('Endpoints after login', () => {
  const agent = request.agent(app);
  const userData: userLoginDTO = {
    username: 'test',
    password: 'test',
  };
  beforeEach(async () => {
    return new Promise<void>(async (resolve) => {
      await agent.post('/api/users/login').send(userData);
      resolve();
    });
  });

  describe('[GET] /api/users/me', () => {
    test('should return logged in user info', async () => {
      const res = await agent.get('/api/users/me');
      expect(res.body).toEqual({ id: 1, username: 'test', firstName: 'John', lastName: 'Doe' });
    });
  });

  describe('[GET] /api/users/logout', () => {
    test('should delete jwt when logged in', async () => {
      const res = await agent.get('/api/users/logout');
      expect(res.body).toEqual({ logoutSuccess: true, message: 'Logged out' });
    });
  });

  describe('[GET] /api/users', () => {
    test('should return list of users', async () => {
      const res = await agent.get('/api/users');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
    });
  });

  describe('[PUT] /api/users', () => {
    test('should return message with cod 200', async () => {
      const payload = {
        firstName: 'Jane',
        lastName: 'Doe',
      };
      const res = await agent.put('/api/users').send(payload);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Successfully updated' });
    });
  });

  describe('[GET] /api/users', () => {
    test('should return list of users', async () => {
      const res = await agent.get('/api/users');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty('firstName', 'Jane');
    });
  });

  describe('[DELETE] /api/users', () => {
    test('should delete currently logged in user', async () => {
      const res = await agent.delete('/api/users');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Successfully deleted' });
    });
  });
});
