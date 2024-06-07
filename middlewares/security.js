const { generateSHA384Hash, encryptMessage, generateSHA512Hash, hideMessage, generateBlake2Hash } = require('../utils/securityUtils');

module.exports = (req, res, next) => {
  const { message, publicKey, stegObject } = req.body;

  if (message && publicKey) {
    // Generar el hash SHA-384 del mensaje
    const sha384Hash = generateSHA384Hash(message);

    // Encriptar el mensaje con RSA
    const encryptedMessage = encryptMessage(publicKey, message);

    // Generar el hash SHA-512 del mensaje encriptado
    const sha512Hash = generateSHA512Hash(encryptedMessage);

    // Ocultar el mensaje en el objeto seleccionado
    const hiddenMessage = hideMessage(stegObject, encryptedMessage);

    // Generar el hash Blake2 del mensaje oculto
    const blake2Hash = generateBlake2Hash(hiddenMessage);

    req.processedData = { sha384Hash, sha512Hash, hiddenMessage, blake2Hash };
  }

  next();
};
