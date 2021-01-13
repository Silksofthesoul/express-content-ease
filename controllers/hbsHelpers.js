const int = (_) => parseInt(_);
const float = (_) => parseFloat(_);
module.exports = function ({ hbs }) {
  hbs.registerHelper('if_eq', function (a, b, opts) {
    if (a == b) {
      return opts.fn(this);
    }
    return opts.inverse(this);
  });
  hbs.registerHelper('if_not_empty', function (arg) {
    console.log(arg, arg.length, arg.length > 0);
    if (arg && arg.length && arg.length > 0) return true;
    return false;
  });
  hbs.registerHelper('clearPhone', (strPhone) => strPhone.replace(/[^0-9+]/gim, ''));
  hbs.registerHelper('calc', (a, b, c) => {
    if (b === '+') return float(a) + float(c);
    if (b === '/') return float(a) / float(c);
    if (b === '*') return float(a) * float(c);
    if (b === '-') return float(a) - float(c);
    return 0;
  });
};
