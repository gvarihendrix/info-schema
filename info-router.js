'use strict';
const router = require('express').Router();
const JSONStream = require('JSONStream');
const info = require('./info-schema');

router.use((req, res, next) => {
  res.type('json');
  next();
});

function isNull(o) {
  return o === undefined || o === null;
}

function routes(r) {
  return r.stack.filter(d => {
    return !isNull(d.route);
  })
  .map(d => {
    return {
      path: d.route.path,
      methods: Object.assign({}, d.route.methods || {})
    };
  });
}

// List routes in module
router.get('/', (req, res) => {
  let m = routes(router);
  return res.status(200).end(JSON.stringify(m));
});

router.get('/tables', (req, res) => {
  info.tables().then(data => {
    return res.status(200).send(JSON.stringify(data));
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
});

/**
 * Gets all tables from information_schema.tables
 * @example curl www.localhost:PORT/{}/table-streams
 * @return {Stream}
 */
router.get('/tables-stream', (req, res) => {
  info.tablesStream((s) => {
    s.pipe(JSONStream.stringify()).pipe(res);
  });
});

router.get('/views-stream', (req, res) => {
  info.viewStream(stream => {
    stream.pipe(JSONStream.stringify()).pipe(res);
  });
});


router.get('/columns', (req, res) => {
  info.columns().then(d => {
    res.status(200).end(JSON.stringify(d));
  });
});

router.get('/columns-stream', (req, res) => {
  info.columnsStream(stream => {
    stream.pipe(JSONStream.stringify()).pipe(res);
  });
});

router.get('/constraint-columns-usage-stream', (req, res) => {
  info.constraintColumnsUsageStream(stream => {
    stream.pipe(JSONStream.stringify()).pipe(res);
  });
});


module.exports = router;