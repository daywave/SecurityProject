const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = upload.single('stegObject'), async (req, res, next) => {
  const { ip, message } = req.body;
  const stegObject = req.file.path;

  if (ip) {
    try {
      // Obtener la dirección MAC
      const mac = await macaddress.one(ip);
      console.log(`MAC Address: ${mac}`);
      
      // Solicitar la llave pública desde el IP proporcionado
      const response = await axios.get(`http://${ip}:3000/public-key`);
      const publicKey = response.data.publicKey;

      // Proceso de seguridad
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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener la llave pública o la dirección MAC' });
    }
  }

  next();
};

