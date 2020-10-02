const fs = require('fs');
const pool = require('../lib/utils/pool');
// const request = require('supertest');
// const app = require('../lib/app');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  it('is a dummy test', () => {
    expect(true).toEqual(true);
  });
});
