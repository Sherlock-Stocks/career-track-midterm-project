require('../data/data_helper');

const { getAgent } = require('../data/data_helper');

describe('Stock routes', () => {
  it('creates a new user and stock', async() => {
    const response = await getAgent()
      .post('/api/v1/stocks')
      .send({
        ticker: 'IBM',
        riskChoice: 'R0',
        startingAmount: 1000,
        startDate: '2020/02/01',
        endDate: '2020/03/01',
        frequency: '1day',
        feePercent: 4,
        buyCondition: 'runningAverage',
        buyUnit: 'U$',
        buyAmount: 145,
        sellCondition: 'runningAverage',
        sellUnit: 'U$',
        sellAmount: 150,
      });

    expect(response.body).toEqual({
      userId: expect.any(String),
      stockId: expect.any(String),
      ticker: 'IBM',
      riskChoice: 'R0',
      startingAmount: 1000,
      startDate: '2020/02/01',
      endDate: '2020/03/01',
      frequency: '1day',
      feePercent: 4,
      buyCondition: 'runningAverage',
      buyUnit: 'U$',
      buyAmount: 145,
      sellCondition: 'runningAverage',
      sellUnit: 'U$',
      sellAmount: 150,
    });
  });

  it('finds a stock by id', async() => {
    const response = await getAgent()
      .get('/api/v1/stocks/1');

    expect(response.body).toEqual({
      userId: expect.any(String),
      stockId: expect.any(String),
      ticker: 'IBM',
      riskChoice: 'R0',
      startingAmount: 1000,
      startDate: '2020/02/01',
      endDate: '2020/03/01',
      frequency: '1day',
      feePercent: 4,
      buyCondition: 'runningAverage',
      buyUnit: 'U$',
      buyAmount: 145,
      sellCondition: 'runningAverage',
      sellUnit: 'U$',
      sellAmount: 150,
    });
  });

  it('finds stock by user id', async() => {
    const response = await getAgent()
      .get('/api/v1/stocks/portfolio/1');
    expect(response.body).toEqual([{
      userId: expect.any(String),
      stockId: expect.any(String),
      ticker: 'IBM',
      riskChoice: 'R0',
      startingAmount: 1000,
      startDate: '2020/02/01',
      endDate: '2020/03/01',
      frequency: '1day',
      feePercent: 4,
      buyCondition: 'runningAverage',
      buyUnit: 'U$',
      buyAmount: 145,
      sellCondition: 'runningAverage',
      sellUnit: 'U$',
      sellAmount: 150,
    },
    {
      userId: expect.any(String),
      stockId: expect.any(String),
      ticker: 'IBM',
      riskChoice: 'R0',
      startingAmount: 1000,
      startDate: '2020/02/01',
      endDate: '2020/03/01',
      frequency: '1day',
      feePercent: 4,
      buyCondition: 'runningAverage',
      buyUnit: 'U$',
      buyAmount: 145,
      sellCondition: 'runningAverage',
      sellUnit: 'U$',
      sellAmount: 150,
    }
    ]);
  });

  it('updates a stock', async() => {
    const response = await getAgent()
      .put('/api/v1/stocks/1')
      .send({
        ticker: 'IBM',
        riskChoice: 'R0',
        startingAmount: 1000,
        startDate: '2020/02/01',
        endDate: '2020/03/01',
        frequency: '1day',
        feePercent: 4,
        buyCondition: 'runningAverage',
        buyUnit: 'U$',
        buyAmount: 145,
        sellCondition: 'runningAverage',
        sellUnit: 'U$',
        sellAmount: 150,
      });

    expect(response.body).toEqual({
      userId: expect.any(String),
      stockId: expect.any(String),
      ticker: 'IBM',
      riskChoice: 'R0',
      startingAmount: 1000,
      startDate: '2020/02/01',
      endDate: '2020/03/01',
      frequency: '1day',
      feePercent: 4,
      buyCondition: 'runningAverage',
      buyUnit: 'U$',
      buyAmount: 145,
      sellCondition: 'runningAverage',
      sellUnit: 'U$',
      sellAmount: 150,
    });
  });

  it('deletes a stock', async() => {
    const response = await getAgent()
      .delete('/api/v1/stocks/1');

    expect(response.body).toEqual({
      userId: expect.any(String),
      stockId: expect.any(String),
      ticker: 'IBM',
      riskChoice: 'R0',
      startingAmount: 1000,
      startDate: '2020/02/01',
      endDate: '2020/03/01',
      frequency: '1day',
      feePercent: 4,
      buyCondition: 'runningAverage',
      buyUnit: 'U$',
      buyAmount: 145,
      sellCondition: 'runningAverage',
      sellUnit: 'U$',
      sellAmount: 150,
    });
  });
});
