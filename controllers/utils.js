const path = require('path');
const fs = require('fs');
const obj = {};

const brFabr = (title, isActive, link) => ({ title, isActive, link });
const rndMinMaxInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const rndFromArray = arr => arr[rndMinMaxInt(0, arr.length - 1)];


const flatten = lists => lists.reduce((a, b) => a.concat(b), []);

const getDirectories = srcpath => fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory());

const getFiles = srcpath => fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isFile());

const getDirectoriesRecursive = srcpath => [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];

const registerPartials = (root, hbs) => {
  const partials = getDirectoriesRecursive(root);
  partials.shift();
  partials.forEach(item => {
    console.log('register partial >>', item);
    hbs.registerPartials(item)
  });
}

obj.brFabr = brFabr;
obj.rndFromArray = rndFromArray;
obj.rndMinMaxInt = rndMinMaxInt;
obj.getFiles = getFiles;
obj.registerPartials = registerPartials;

module.exports = obj;
