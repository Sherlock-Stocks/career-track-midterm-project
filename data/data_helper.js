const fs = require('fs');
const pool = require('../lib/utils/pool');
const seed = require('./seed');
const request = require('supertest');
const app = require('../lib/app');

beforeEach(() => {
  return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
});

beforeEach(() => {
  return seed();
});

const agent = request.agent(app);
beforeEach(() => {
  return agent
    .post('/api/v1/auth/login')
    .send({
      email: 'test1@test.com',
      password: 'password1'
    });
});

beforeEach(() => {
  return agent
    .post('/api/v1/stocks')
    .send({
      ticker: 'NIKE',
      riskChoice: 'R0',
      startingAmount: 500,
      startDate: '1-1-2020',
      endDate: '3-30-2020',
      frequency: 'TIME_SERIES_DAILY',
      feePercent: 4,
      buyCondition: 'runningAverage',
      buyUnit: 'U$',
      buyAmount: 50,
      sellCondition: 'runningAverage',
      sellUnit: 'U$',
      sellAmount: 20,
    });
});

module.exports = {
  getAgent: () => agent
};
