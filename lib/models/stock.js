const pool = require('../utils/pool');

module.exports = class Stock {
  stockId;
  userId;
  ticker;
  riskChoice;
  startingAmount;
  startDate;
  endDate;
  frequency;
  feePercent;
  buyCondition;
  buyUnit;
  buyAmount;
  sellCondition;
  sellUnit;
  sellAmount;

  constructor(row) {
    this.stockId = row.id;
    this.userId = row.user_id;
    this.ticker = row.ticker;
    this.riskChoice = row.risk_choice;
    this.startingAmount = row.starting_amount;
    this.startDate = row.start_date;
    this.endDate = row.end_date;
    this.frequency = row.frequency;
    this.feePercent = row.fee_percent;
    this.buyCondition = row.buy_condition;
    this.buyUnit = row.buy_unit;
    this.buyAmount = row.buy_amount;
    this.sellCondition = row.sell_condition;
    this.sellUnit = row.sell_unit;
    this.sellAmount = row.sell_amount;
  }

  static async insert(stock) {
    const { rows } = await pool.query(
      'INSERT INTO stocks (user_id, ticker, risk_choice, starting_amount, start_date, end_date, frequency, fee_percent, buy_condition, buy_unit, buy_amount, sell_condition, sell_unit, sell_amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
      [stock.userId, stock.ticker, stock.riskChoice, stock.startingAmount, stock.startDate, stock.endDate, stock.frequency, stock.feePercent, stock.buyCondition, stock.buyUnit, stock.buyAmount, stock.sellCondition, stock.sellUnit, stock.sellAmount]
    );
    return new Stock(rows[0]);
  }

  static async findStocksByUserId(id) {
    const { rows } = await pool.query(
      'SELECT * FROM stocks WHERE user_id=$1',
      [id]
    );
    return rows.map(row => new Stock(row));
  }

  static async findStockById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM stocks WHERE id=$1',
      [id]
    );
    
    if(!rows[0]) return null;
    else return new Stock(rows[0]);
  }

  static async updateStockById(id, updatedStock) {
    const { rows } = await pool.query(
      `UPDATE stocks
       SET ticker = $1,
        risk_choice = $2,
        starting_amount = $3,
        start_date = $4,
        end_date = $5,
        frequency = $6,
        fee_percent = $7,
        buy_condition = $8,
        buy_unit = $9,
        buy_amount = $10,
        sell_condition = $11,
        sell_unit = $12,
        sell_amount = $13
       WHERE id = $14
       RETURNING *
      `,
      [
        updatedStock.ticker, updatedStock.riskChoice, updatedStock.startingAmount, updatedStock.startDate, updatedStock.endDate, updatedStock.frequency, updatedStock.feePercent,
        updatedStock.buyCondition, updatedStock.buyUnit, updatedStock.buyAmount, updatedStock.sellCondition, updatedStock.sellUnit, updatedStock.sellAmount, id
      ]
    );

    return new Stock(rows[0]);
  }

  static async deleteStockById(id) {
    const { rows } = await pool.query(
      'DELETE FROM stocks WHERE id = $1 RETURNING *', [id]
    );
    return new Stock(rows[0]);
  }
};
