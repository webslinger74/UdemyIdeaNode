const bcrypt = require('bcryptjs');

exports.hashPassword = (password) => {
  return bcrypt.hash(password, 12);
};
