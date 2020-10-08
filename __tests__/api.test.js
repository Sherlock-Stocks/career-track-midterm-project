const request = require('supertest');
const app = require('../lib/app');

describe('api-calls routes', () => {
  it('return history of chosen stock id', async() => {
    const apiCall = await request(app)
      .post('/api/v1/data/TSLA')
      .send({
        startDate: '2020/02/01',
        endDate: '2020/02/03',
        frequency: '1day'
      });
      
    expect(apiCall.text).toEqual(expect.any(String));
  });
});
