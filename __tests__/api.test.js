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
    expect(apiCall.text).toEqual('{"meta":{"symbol":"TSLA","interval":"1day","currency":"USD","exchange_timezone":"America/New_York","exchange":"NASDAQ","type":"Common Stock"},"values":[{"datetime":"2020-02-03","open":"134.73800","high":"157.22800","low":"134.70400","close":"156.00000","volume":"47233500"}],"status":"ok"}');
  });
});
