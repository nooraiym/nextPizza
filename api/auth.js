const { handler } = require("mock-user-auth");

module.exports = (req, res) => {
  handler(req, res);
};
