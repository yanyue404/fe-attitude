const path = require('path');
const template = require('art-template');

module.exports = function(res) {
  res.render = function(fileName, dataObj) {
    const html = template(
      path.join(__dirname, `../views/${fileName}.html`),
      dataObj
    );
    this.end(html);
  };
  res.json = function(dataObj) {
    this.end(JSON.stringify(dataObj));
  };
};
