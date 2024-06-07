import fs from 'fs-extra';
import path from 'path';
import { revealMessage, generateBlake2Hash, generateSHA512Hash, generateSHA384Hash, decryptMessage } from '../utils/securityUtils.mjs';

export const captureMessage = (req, res) => {
  const { message, publicKey, stegObject } = req.body;

  // Código para capturar mensaje o documento y procesarlo
  // Se asume que el middleware security.mjs ya procesó y guardó los datos necesarios en req.processedData
  const { sha384Hash, sha512Hash, hiddenMessage, blake2Hash } = req.processedData;

  // Guardar el objeto con el mensaje oculto
  fs.writeFileSync(path.join('hidden', stegObject), hiddenMessage);

  res.json({ sha384Hash, sha512Hash, hiddenMessage, blake2Hash });
};

export const sendMessage = (req, res) => {
  const { stegObject } = req.body;

  // Código para enviar el objeto con el mensaje oculto al otro equipo
  // Aquí puedes usar sockets, HTTP, o cualquier otra forma de comunicación

  res.json({ success: true });
};

export const receiveMessage = (req, res) => {
  const { stegObject } = req.body;

  // Extraer el mensaje del objeto
  const hiddenMessage = fs.readFileSync(path.join('hidden', stegObject));
  const message = revealMessage(hiddenMessage);

  // Validar el hash Blake2
  const blake2Hash = generateBlake2Hash(message);
  if (blake2Hash !== req.body.blake2Hash) {
    return res.status(400).json({ error: 'Comunicación alterada' });
  }

  // Validar el hash SHA-512
  const sha512Hash = generateSHA512Hash(message);
  if (sha512Hash !== req.body.sha512Hash) {
    return res.status(400).json({ error: 'Error en la comunicación' });
  }

  // Desencriptar el mensaje con la llave privada
  const privateKey = fs.readFileSync('keys/private.pem', 'utf8');
  const decryptedMessage = decryptMessage(privateKey, message);

  // Validar el hash SHA-384
  const sha384Hash = generateSHA384Hash(decryptedMessage);
  if (sha384Hash !== req.body.sha384Hash) {
    return res.status(400).json({ error: 'Sistema vulnerado' });
  }

  res.json({ message: decryptedMessage });
};
