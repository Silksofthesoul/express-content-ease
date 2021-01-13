const path = require('path');
const { readJSON } = require('../../controllers/assets');

const co = o => JSON.parse(JSON.stringify(o));

module.exports = async ({
  url: _url = '',
  template: _template = null,
  content: _content = {}
}) => {
  try {
    var extra = await readJSON(path.join(__dirname, '../../data/extra.json'));
  } catch (e) {
    if (e) return next({ message: e.message, stack: e.stack });
  }
  const url = _url;
  const template = _template;
  const content = {
    ..._content,
    title: _content.title.replace(/Inner/gim, 'Allright'),
    extra,
    test: 'test',
    add: 'hello friend'
  };
  return { url, template, content };
};
