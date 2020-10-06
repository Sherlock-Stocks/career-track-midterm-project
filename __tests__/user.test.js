const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/user-service');

describe('Auth routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('signup a user via POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        phoneNumber: '7078675309',
      });

    expect(response.body).toEqual({
      userId: expect.any(String),
      email: 'test@test.com',
      phoneNumber: '7078675309',
    });
  });
  
  it('logs in a user via POST', async() => {
    const user = await UserService.create({
      email: 'test@test.com',
      password: 'password',
      phoneNumber: '7078675309',
    });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
      });

    expect(response.body).toEqual({
      userId: user.userId,
      email: 'test@test.com',
      phoneNumber: '7078675309',
    });
  });

  it('verifies a user via GET', async() => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        phoneNumber: '7078675309',
      });

    const response = await agent
      .get('/api/v1/auth/verify');
    
    expect(response.body).toEqual({
      userId: expect.any(String),
      email: 'test@test.com',
      phoneNumber: '7078675309',
      portfolio: [{}]
    });


    const responseWithoutAUser = await request(app)
      .get('/api/v1/auth/verify');

    expect(responseWithoutAUser.body).toEqual({
      status: 500,
      message: 'jwt must be provided',
    });
  });
});
