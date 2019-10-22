const app = require('../app.js');
const expect = require('chai').expect;

describe('server 构建正常吗？', () => {
  it('通过', () => {
    expect(app).to.be.an('object');
  });
});