
const {
  loginUser,
  createNewUser,
  changeUserEmail,
  changeUserPassword,
  getAsignaturasUser
} = require('./users.services');
const { sendResponse, controlErrores } = require('../../utils');
const ResponseMessages = require('../../constants/responseMessages');

async function createNewUserController(req, res) {
  try {
    

    const {
      email, password, primer_apellido,segundo_apellido
    } = req.body;
   

    const data = await createNewUser({
      email,
      password,
      primer_apellido,
      segundo_apellido,
     
    });
    
    return sendResponse(res, 201, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function loginUserController(req, res) {
  try {
    

    const { email, password } = req.body;
    console.log(req.body);
    const data = await loginUser({
      email,
      password,
    });
     return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function changeUserEmailController(req, res) {
  try {
     

    const { oldEmail, newEmail, password } = req.body;
    const { id: userId } = req.user;

    const data = await changeUserEmail({
      userId,
      oldEmail,
      newEmail,
      password,
    });
    // return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function changeUserPasswordController(req, res) {
  try {
     
    
    const { oldPassword, newPassword } = req.body;
    const { id: userId } = req.user;

    const data = await changeUserPassword({
      userId,
      oldPassword,
      newPassword,
    });
    // return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getAsignaturasUserController(req, res) {
  try {
    
    const { id: id } = req.params;

    const data = await getAsignaturasUser(id);
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}

async function getAsignaturasHorasUserController(req, res) {
  try {
    
    const { id: id } = req.params;

    const data = await getAsignaturasUser(id);
    return sendResponse(res, 200, { ...data }, ResponseMessages.genericSuccess);
  } catch (err) {
    return controlErrores(res, err);
  }
}




module.exports = {
  createNewUserController,
  loginUserController,
  changeUserEmailController,
  changeUserPasswordController,
  getAsignaturasUserController,
  getAsignaturasHorasUserController
};
