/* eslint-disable arrow-parens */
const fsPromises = require('fs').promises;

function getDataInfo(filePath) {
  return fsPromises.readFile(filePath, { encoding: 'utf8' })
    .then(data => JSON.parse(data));
}

module.exports = getDataInfo;
