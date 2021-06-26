const User = require('../models/usersModel');
const { hashPassword } = require('../authentication/hashPasswords');

exports.getCreateUserPage = () => {
  return async (req, res) => {
    res.render('createUser.html');
  };
};

exports.postCreateUserDetails = () => {
  return async (req, res) => {
    const signUpDetails = req.body;
    console.log(signUpDetails, 'signupdetails');
    const { password } = req.body;
    try {
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword);
      signUpDetails.password = hashedPassword;
      const user = await User.create(signUpDetails);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
};

exports.getLoginPage = () => {
  return async (req, res) => {
    res.render('loginUser.html');
  };
};

exports.postLoginUserDetails = () => {
  return async (req, res) => {
    const loginDetails = req.body;
    console.log(loginDetails);
    res.render('fruits.html');
  };
};
