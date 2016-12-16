'use strict';
const Promise = require('bluebird');
const pgq = require('pg-promise')({
  promiseLib: Promise
});

const config = {
  host: 'localhost',
  port: 5432,
  database: 'demo',
  user: 'ingvars',
  password: 'Gvario7335'
};

const database =  (() => {
  return pgq(config);
})();

module.exports = database;
