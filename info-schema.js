'use strict';
const db = require('./db');
const QueryStream = require('pg-query-stream');

const exp = {};

const tablesQuery =
`
select t.table_catalog,
       t.table_schema
  from information_schema.tables t
 where t.table_type = 'BASE TABLE'
`.trim();

let tables = exp.tables = () => {
  return db.query(tablesQuery);
};

let tableStream = exp.tablesStream = (fn) => {
  let q = new QueryStream(tablesQuery);
  return db.stream(q, fn);
};

const viewsQuery =
`
select t.table_catalog,
       t.table_schema
  from information_schema.tables t
 where t.table_type = 'VIEW'
`.trim();
let viewStream = exp.viewStream = (fn) => {
  let q = new QueryStream(viewsQuery);
  return db.stream(q, fn);
};

const columnsQuery =
`
select *
  from information_schema.columns
`.trim();

let columns = exp.columns = () => {
  return db.query(columnsQuery);
};

let columnsStream = exp.columnsStream = (fn) => {
  let q = new QueryStream(columnsQuery);
  return db.stream(q, fn);
};

const constraintColumnsUsageQuery =
`
select *
  from information_schema.constraint_column_usage
`.trim();

let constraintColumnsUsage = exp.constraintColumnsUsage  = () => {
  return db.query(constraintColumnsUsageQuery);
};

let constraintColumnsUsageStream = exp.constraintColumnsUsageStream  = (fn) => {
  let q = new QueryStream(constraintColumnsUsageQuery);
  return db.stream(q, fn);
};


module.exports = exp;