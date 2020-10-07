const express = require('express');
const app = express();
const cors = cors();

app.use(express.json());
app.use(cors());
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
