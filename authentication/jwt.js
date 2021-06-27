const jwt = require('jsonwebtoken');

exports.signJwtToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.verifyJwtToken = (token) => {
  const authorized = jwt.verify(token, process.env.JWT_SECRET);
  return authorized;
};
