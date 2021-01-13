const path = require('path');
const { readJSON } = require('../../controllers/assets');

module.exports = async ({
  url: _url = '',
  template: _template = null,
  content: _content = {}
}) => {
  try {
    var {pages} = await readJSON(path.join(__dirname, '../../data/pages.json'));
  } catch (e) {
    if (e) return next({ message: e.message, stack: e.stack });
  }
  const navigation = pages.map(({url, content: {title}}) => ({url, title}))
  const url = _url;
  const template = _template;
  const content = {
    navigation,
    test2: 'hello from common handler',
    ..._content,
  };
  return { url, template, content };
};
