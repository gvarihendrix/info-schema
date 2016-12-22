'use strict';
const Promise = require('bluebird');
const fs = require('fs');
const pgq = require('pg-promise')({
  promiseLib: Promise
});

const config = {
  host: 'localhost',
  port: 5432,
  database: 'demo',
  user: 'ingvars'
};

const database =  (() => {
  return pgq(config);
})();

module.exports = database;
