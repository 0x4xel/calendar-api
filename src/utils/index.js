const hashPayload = require('./hashPayload');
const sendResponse = require('./sendResponse');
const controlErrores = require('./ControlErrores');
const {
  createAccessToken,
  decryptAccessToken,
  createaRefreshToken,
  decryptRefreshToken,
} = require('./encryption');
// const logger = require('./logger');

module.exports = {
  hashPayload,
  sendResponse,
  controlErrores,
  jwt: {
    createAccessToken,
    decryptAccessToken,
    createaRefreshToken,
    decryptRefreshToken,
  },
};
