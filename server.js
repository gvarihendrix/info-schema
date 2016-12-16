'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const infoRouter = require('./info-router');

app.use('/api/info-schema', infoRouter);

const PORT = 3000;

app.get('/', (req, res) => {
  res.status(200).end(JSON.stringify({ message: 'hello world' }));
});


app.get('/api', (req, res) => {
  res.status(200).end(JSON.stringify(app._router.stack));
});

app.listen(PORT, () => {
  console.log(`Starting server on localhost:${PORT}`);
});