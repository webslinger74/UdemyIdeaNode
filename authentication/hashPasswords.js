const bcrypt = require('bcryptjs');

exports.hashPassword = (password) => {
  return bcrypt.hash(password, 12);
};

exports.verifyPassword = async (password, storedPassword) => {
  const result = await bcrypt.compare(password, storedPassword);
  if (result === true) {
    return true;
  }
  return false;
};
