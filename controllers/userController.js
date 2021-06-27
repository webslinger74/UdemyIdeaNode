const User = require('../models/usersModel');
const { signJwtToken, verifyJwtToken } = require('../authentication/jwt');
const {
  hashPassword,
  verifyPassword,
} = require('../authentication/hashPasswords');

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
      res.render('loginUser.html');
    } catch (error) {
      console.log(error);
    }
  };
};

// async await seems to just be used when you call a method that returns a promise
// wrap it in a try catch and the function is is in is async.

exports.getLoginPage = () => {
  return async (req, res) => {
    res.render('loginUser.html');
  };
};

exports.postLoginUserDetails = () => {
  return async (req, res) => {
    const loginDetails = req.body;
    const { email, password } = loginDetails;
    console.log(loginDetails);
    User.findOne({ email: email }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log('ok');
        console.log(response.password, 'the user');
        verifyPassword(password, response.password)
          .then((passData) => {
            console.log(passData, 'passData');
            if (passData === true) {
              console.log('this is so trueeeeee!');
              const token = signJwtToken(email);
              res.render('fruits.html');
            } else {
              const filtered = {
                error: 'You have entered the incorrect details try again!',
              };
              res.render('loginUser.html', { fruitData: filtered });
            }
          })
          .catch((errPass) => {
            console.log(errPass);
          });
      }
    });
  };
};
