'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.baseUrl === '/api') {
    res.type('json');
  }
  next();
});

app.use('/api/info-schema', require('./info-router'));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).end(JSON.stringify({ message: 'hello world' }));
});

app.get('/api', (req, res) => {
  var url = `${req.protocol}://${req.hostname}/${req.baseUrl}`;
  var m  = app._router.stack
    .filter(r => r.path && r.path !== '')
    .map(r => {
      var p = r.path.substring(1, r.path.length);
      return url + p;
    });


  res.status(200).end(JSON.stringify({ data: m }));
});

app.listen(PORT, () => {
  console.log(`Starting server on localhost:${PORT}`);
});