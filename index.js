// std
const path = require('path');

// dependences
const express = require('express');
const hbs = require('hbs');
const minifyHTML = require('express-minify-html');
const bodyParser = require('body-parser');

// app
const routes = require('./routes');
const settings = require('./settings');
const hbsHelpers = require('./controllers/hbsHelpers');
const { registerPartials } = require('./controllers/utils');

require('dotenv').config();

const { port, isMinify, options } = settings;

const app = express();

app.set('env', process.env.NODE_ENV);

// template engine
hbsHelpers({ hbs });
app.set('view engine', 'hbs');
registerPartials(`${__dirname}/views`, hbs);


// minifycation
if (isMinify) {
  app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
    },
  }));
}

app.use((req, res, next) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  };
  Object.entries(headers)
  .forEach(([key, value], i) => res.header(key, value));
  next();
}).options('*', (req, res) => res.end());

app.use(express.static('static', options));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true,
  parameterLimit: 5000,
}));


const param = { };

const middle = function (req, res, next) {
  console.log('--------- -----------');
  console.log(`${req.method}: ${req.url}`);
  next();
};
app.use(middle);

const runRouters = async _ =>  {
  for (let [key, router] of Object.entries(routes)) {
    await router(app, param[key] ? param[key] : null);
  }
}

runRouters();

app.listen(port, (err) => {
  if (err) {
    return console.error('error: ', err);
    throw new Error(err);
  }
  console.log(`\n\n`);
  console.log('process.env.NODE_ENV:\t ', process.env.NODE_ENV);
  console.log('env:\t\t\t ', app.get('env'));
  console.log('using minify:\t\t ', isMinify);
  console.log('view engine:\t\t ', app.get('view engine'));
  console.log(`Server runing on http://localhost:${port}/ ${new Date()}`);
  console.log(`\n\n`);
});
