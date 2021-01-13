const path = require('path');
const fsp = require('fs').promises;
const { readJSON } = require('../controllers/assets');
const commonHandler = require('./handlers/common');
const co = o => JSON.parse(JSON.stringify(o));

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const pipeAsync = (...fns) => x => new Promise(async (resolve) => {
  let res = x;
  for (let f of fns) res = await f(res);
  resolve(res);
});

const route = async (app, ctx) => {
  try {
    var resPages = await readJSON(path.join(__dirname, '../data/pages.json'));
  } catch (e) {
    if (e) return next({ message: e.message, stack: e.stack });
  }
  const {pages: routes = [], handlers: commonHandlers = []} = resPages;

  for (let router of routes) {
    let { url, template, content, handler } = router;
    let handlerFunction = async _ => handler ? await require(`./handlers/${handler}`)(_) : _;

    let handlers = [
      _ => _,
      ...commonHandlers.map(h => _ => require(`./handlers/${h}`)(_)),
      _ => handlerFunction(_),
    ];

    let {
      url: urlPath = null,
      template: templateFile = null,
      content: contentObject = {},
    } = await pipeAsync(...handlers)(router);

    app.get(urlPath, (req, res, next) => {
      res.render(templateFile, contentObject, function(err, html) {
        res.send(html);
      });
    });
  }
};

module.exports = route;
