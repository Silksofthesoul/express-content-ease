const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'mp3', 'ogg', 'wav', 'js', 'txt'],
  index: false,
  maxAge: 1,
  redirect: false,
  setHeaders(res) {
    res.set('x-timestamp', Date.now());
  },
};
const isCompileStatic = false;
const isMinify = false;
const port = 3000;

module.exports = {
  port,
  options,
  isMinify,
  isCompileStatic,
};
