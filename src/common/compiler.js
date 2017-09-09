var EJS = require("ejs");
EJS.delimiter = "?";

module.exports = function(template, viewScope) {
  return EJS.compile(template, { context: viewScope })
}
