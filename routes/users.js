const express = require('express');

const usersRouter = express.Router();
const {
  getCreateUserPage,
  getLoginPage,
  postCreateUserDetails,
  postLoginUserDetails,
} = require('../controllers/userController');

usersRouter.get('/create', getCreateUserPage());
usersRouter.post('/create', postCreateUserDetails());
usersRouter.get('/login', getLoginPage());
usersRouter.post('/login', postLoginUserDetails());

module.exports = usersRouter;
