const path = require('path');
const { readFile } = require('fs').promises;


const s = (_) => {
  try {
    var res = JSON.stringify(_);
  } catch (e) {
    if (e) throw new Error(e);
  }
  return res;
};
const p = (_) => {
  try {
    var res = JSON.parse(_);
  } catch (e) {
    if (e) throw new Error(e);
  }
  return res;
};
const co = (_) => {
  try {
    var res = p(s(_));
  } catch (e) {
    if (e) throw new Error(e);
  }
  return res;
};

const obj = {};

const readJSON = async (pathToFile) => {
  const pathJson = path.resolve(pathToFile);
  try {
    const file = await readFile(pathJson);
    var json = p(file.toString());
  } catch (e) {
    if (e) throw new Error(e);
  }
  return json;
};

const _readFile = async (pathToFile) => {
  const pathJson = path.resolve(pathToFile);
  try {
    const file = await readFile(pathJson);
    var res = file.toString();
  } catch (e) {
    if (e) throw new Error(e);
  }
  return res;
};

obj.readJSON = readJSON;
obj.readFile = _readFile;

module.exports = obj;
