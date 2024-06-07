const express = require('express');
const router = express.Router();
const { captureMessage, sendMessage, receiveMessage } = require('../controllers/securityController');

router.get('/', (req, res) => {
  res.render('pages/index', { title: 'Home' });
});

router.get('/capture-message', (req, res) => {
  res.render('pages/capture-message', { title: 'Capture Message' });
});

router.post('/capture-message', captureMessage);
router.post('/send-message', sendMessage);
router.post('/receive-message', receiveMessage);

module.exports = router;

