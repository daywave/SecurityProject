const express = require('express');
const router = express.Router();
const { captureMessage, sendMessage } = require('../controllers/securityController');

router.get('/public-key', (req, res) => {
  // Generar y devolver la llave pública
  const key = new NodeRSA({ b: 512 });
  const publicKey = key.exportKey('public');
  res.json({ publicKey });
});

router.post('/capture-message', captureMessage);
router.post('/send-message', sendMessage);

module.exports = router;
