const { MySQL } = require('../../db');
const { hashPayload, jwt } = require('../../utils');

async function createNewUser({ email, password, primer_apellido, segundo_apellido }) {
  const hashedPassword = await hashPayload(password);

  const user = await MySQL.User.create(
    {
      email: email,
      password: hashedPassword,
      nombre: nombre,
      primer_apellido: primer_apellido,
      segundo_apellido: segundo_apellido,
    }
  );

  return { user };


}

async function loginUser({ email, password }) {
  const hashedPassword = await hashPayload(password);

  const res = await MySQL.sequelize.query('SELECT * FROM users WHERE email = ?', {
    type: MySQL.sequelize.QueryTypes.SELECT,
    replacements: [email],
  });

  // console.log('---res ---', res);

  if (!res[0]) {
    const err = new Error('User Not found');
    err.code = 404;
    err.msg = 'User not found in records';
    throw err;
  }

  if (res[0].password !== hashedPassword) {
    const msg = 'Error in Email/Password';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  const accessToken = jwt.createAccessToken({
    id: res[0].id,
    email: res[0].email,
    mobile: res[0].mobile,
    tokenType: 'LoginToken',
  });

  delete res[0].password;
  delete res[0].created_at;
  delete res[0].updated_at;

  return {
    user: res[0],
    token: accessToken,
  };
}

async function changeUserPassword({ userId, oldPassword, newPassword }) {
  const res = await MySQL.sequelize.query('SELECT * FROM users WHERE id = ?', {
    type: MySQL.sequelize.QueryTypes.SELECT,
    replacements: [userId],
  });

  // console.log('---res ---', res);

  if (!res[0]) {
    const msg = 'User not found in records';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  if (res[0].is_active || res[0].is_blocked || res[0].is_deleted) {
    const msg = 'User is not allowed to perform any action. Account is susspended';
    const err = new Error(msg);
    err.code = 403;
    err.msg = msg;
    throw err;
  }

  const oldHashedPassword = await hashPayload(oldPassword);

  if (res[0].password !== oldHashedPassword) {
    const msg = 'Incorrect credential, Not allowed';
    const err = new Error(msg);
    err.code = 401;
    err.msg = msg;
    throw err;
  }

  const newHashedPassword = await hashPayload(newPassword);
  await MySQL.sequelize.query('UPDATE users SET password = ? WHERE id = ?', {
    type: MySQL.sequelize.QueryTypes.UPDATE,
    replacements: [newHashedPassword, userId],
  });
  return {};
}

async function changeUserEmail({
  userId, oldEmail, newEmail, password,
}) {
  const res = await MySQL.sequelize.query('SELECT * FROM users WHERE id = ?', {
    type: MySQL.sequelize.QueryTypes.SELECT,
    replacements: [userId],
  });

  // console.log('---res ---', res[0]);

  if (!res[0]) {
    const msg = 'User not found in records';
    const err = new Error(msg);
    err.code = 404;
    err.msg = msg;
    throw err;
  }

  if (res[0].email !== oldEmail) {
    const msg = 'Invalid userId and userEmail combination';
    const err = new Error(msg);
    err.code = 401;
    err.msg = msg;
    throw err;
  }

  if (res[0].is_active || res[0].is_blocked || res[0].is_deleted) {
    const msg = 'User is not allowed to perform any action. Account is susspended';
    const err = new Error(msg);
    err.code = 403;
    err.msg = msg;
    throw err;
  }

  const hashedPassword = await hashPayload(password);

  if (res[0].password !== hashedPassword) {
    const msg = 'Incorrect credential, Not allowed';
    const err = new Error(msg);
    err.code = 401;
    err.msg = msg;
    throw err;
  }

  await MySQL.sequelize.query('UPDATE users SET email = ? WHERE id = ?', {
    type: MySQL.sequelize.QueryTypes.UPDATE,
    replacements: [newEmail, userId],
  });
  return {};
}

async function getAsignaturasUser(id) {
  const asignaturas = await MySQL.Asignatura.findAll({
    where: { user_id: id },
    
    include: {
      model: MySQL.AsignaturaHora,
    }
  });

  return { asignaturas };
}
module.exports = {
  createNewUser,
  loginUser,
  changeUserPassword,
  changeUserEmail,
  getAsignaturasUser
};
