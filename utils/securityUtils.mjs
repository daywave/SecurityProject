import crypto from 'crypto';
import NodeRSA from 'node-rsa';
import * as steg from 'steg';
import fs from 'fs-extra';

const generateSHA384Hash = (message) => {
  return crypto.createHash('sha384').update(message).digest('hex');
};

const encryptMessage = (publicKey, message) => {
  const key = new NodeRSA(publicKey);
  return key.encrypt(message, 'base64');
};

const generateSHA512Hash = (message) => {
  return crypto.createHash('sha512').update(message).digest('hex');
};

const hideMessage = (stegObject, message) => {
  return steg.hideSync(stegObject, message);
};

const generateBlake2Hash = (message) => {
  return crypto.createHash('blake2b512').update(message).digest('hex');
};

const revealMessage = (stegObject) => {
  return steg.revealSync(stegObject);
};

const decryptMessage = (privateKey, encryptedMessage) => {
  const key = new NodeRSA(privateKey);
  return key.decrypt(encryptedMessage, 'utf8');
};

export {
  generateSHA384Hash,
  encryptMessage,
  generateSHA512Hash,
  hideMessage,
  generateBlake2Hash,
  revealMessage,
  decryptMessage
};


