const UserService = require('../lib/services/user-service');
const Stock = require('../lib/models/stock');

module.exports = async({ userCount = 5, stockCount = 10 } = {}) => {
  await Promise.all([...Array(userCount)].map((_, i) => {
    return UserService.create({
      email: `test${i + 1}@test.com`,
      password: `password${i + 1}`,
      phoneNumber: `${i + 1}078675309`
    });
  }));

  await Promise.all([...Array(stockCount)].map((_, i) => {
    return Stock.insert({
      userId: `${Math.floor(i / 2) + 1}`,
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
  }));
};
