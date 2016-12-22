'use strict';
const db = require('../db.js');
const QueryStream = require('pg-query-stream');
const dbUtil = require('./utils');

const tablesQuery = dbUtil.sql('./queries/tables.sql');

let tables = exports.tables = () => {
  return db.query(tablesQuery);
};

exports.tablesStream = (fn) => {
  let q = new QueryStream(tablesQuery.query);
  return db.stream(q, fn);
};

const viewsQuery = dbUtil.sql('./queries/views.sql'); 

console.log(viewsQuery);

exports.viewStream = (fn) => {
  let q = new QueryStream(viewsQuery.query);
  return db.stream(q, fn);
};

const columnsQuery = dbUtil.sql('./queries/columns.sql');

exports.columns = () => {
  return db.query(columnsQuery);
};

exports.columnsStream = (fn) => {
  let q = new QueryStream(columnsQuery);
  return db.stream(q, fn);
};

const constraintColumnsUsageQuery = dbUtil.sql('./queries/columns_usage.sql');

exports.constraintColumnsUsage  = () => {
  return db.query(constraintColumnsUsageQuery);
};

exports.constraintColumnsUsageStream  = (fn) => {
  let q = new QueryStream(constraintColumnsUsageQuery);
  return db.stream(q, fn);
};

const foreignKeysQuery = dbUtil.sql('./queries/table_foreign_keys.sql');

exports.findForeignKeys = (tableName) => {
  return db.query(foreignKeysQuery, { table_name: tableName });
};

