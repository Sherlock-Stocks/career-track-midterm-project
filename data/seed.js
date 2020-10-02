const UserService = require('../lib/services/user-service');
const Stock = require('../lib/models/stock');

module.exports = async({ userCount = 5, stockCount = 5 } = {}) => {
  const users = await Promise.all([...Array(userCount)].map((_, i) => {
    return UserService.create({
      email: `test${i + 1}@test.com`,
      password: `password${i + 1}`,
      phoneNumber: `${i + 1}078675309`
    });
  }));

  const stocks = await Promise.all([...Array(stockCount)].map((_, i) => {
    return Stock.insert({
      userId: `${ i + 1 }`,
      ticker: 'IBM',
      riskChoice: 'R0', //R0, R1, R2, R3
      startingAmount: 500,
      startDate: '1-1-2020',
      endDate: '3-30-2020',
      frequency: 'TIME_SERIES_DAILY', //TIME_SERIES_INTRADAY_EXTENDED(interval), TIME_SERIES_DAILY, week, month, year
      feePercent: 4,
      buyCondition: 'runningAverage', //runningAverage, amount
      buyUnit: 'U$', //U$, U%
      buyAmount: 50,
      sellCondition: 'runningAverage',
      sellUnit: 'U$',
      sellAmount: 20,
    });
  }));
};
