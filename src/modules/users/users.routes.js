const userRoutes = require('express').Router();
const {
  loginUserController,
  createNewUserController,
  changeUserEmailController,
  changeUserPasswordController,
  getAsignaturasUserController
} = require('./users.controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

userRoutes.post('/users/login', loginUserController);
userRoutes.post('/users/new', isAuthenticated, createNewUserController);
userRoutes.patch('/users/email', isAuthenticated, changeUserEmailController);
userRoutes.patch('/users/password', isAuthenticated, changeUserPasswordController);

userRoutes.get('/userAsignaturas/:id', getAsignaturasUserController);


module.exports = userRoutes;
