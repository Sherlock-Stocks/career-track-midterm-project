DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stocks;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  phone_number TEXT
);

CREATE TABLE stocks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  ticker TEXT NOT NULL,
  risk_choice TEXT NOT NULL,
  starting_amount INT NOT NULL,
  "start_date" TEXT NOT NULL,
  end_date TEXT NOT NULL,
  frequency TEXT NOT NULL,
  fee_percent INT NOT NULL,
  buy_condition TEXT NOT NULL,
  buy_unit TEXT NOT NULL,
  buy_amount INT NOT NULL,
  sell_condition TEXT NOT NULL,
  sell_unit TEXT NOT NULL,
  sell_amount INT NOT NULL
);
