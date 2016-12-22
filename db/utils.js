const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

const defaultOpts = { minify: true, compress: true };

exports.sql = (file, options) => {
  return new QueryFile(path.join(__dirname, file),
    options ? Object.assign(defaultOpts, options) : defaultOpts
  );
};
