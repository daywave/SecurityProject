import express from 'express';
import { captureMessage, sendMessage, receiveMessage } from '../controllers/securityController.mjs';
import { upload, securityMiddleware } from '../middlewares/security.mjs';
import NodeRSA from 'node-rsa';

const router = express.Router();

router.get('/public-key', (req, res) => {
  // Generar y devolver la llave pública
  const key = new NodeRSA({ b: 512 });
  const publicKey = key.exportKey('public');
  res.json({ publicKey });
});

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/capture-message', (req, res) => {
  res.render('capture-message', { title: 'Capture Message' });
});

router.post('/capture-message', upload.single('stegObject'), securityMiddleware, captureMessage);
router.post('/send-message', sendMessage);
router.post('/receive-message', receiveMessage);

export default router;

