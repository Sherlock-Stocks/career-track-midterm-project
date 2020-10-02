const fs = require('fs');
const pool = require('../lib/utils/pool');
const { users, stocks } = require('../data/seed');
// const request = require('supertest');
// const app = require('../lib/app');

describe('Stock routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  it('creates a new user and stock', async() => {
    
    const createdUser = await users,
      createdStock = await stocks;

    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id = $1', [createdUser[0].id]);

    expect(rows).not.toBeUndefined();



    expect(createdStock).equal({
      userId: expect.any(String),
      ticker: 'IBM',
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
});
