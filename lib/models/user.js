const pool = require('../utils/pool');

module.exports = class User {
  userId;
  email;
  passwordHash;
  phoneNumber;

  constructor(row) {
    this.userId = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.phoneNumber = row.phone_number;
  }

  static async insert(user) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash, phone_number) VALUES ($1, $2, $3) RETURNING *',
      [user.email, user.passwordHash, user.phoneNumber]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );
    if(!rows[0]) return null;
    return new User(rows[0]);
  }

  //add delete or update route?

  toJSON() {
    return {
      userId: this.userId,
      email: this.email,
      phoneNumber: this.phoneNumber,
    };
  }
};
