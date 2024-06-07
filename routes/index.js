const express = require('express');
const router = express.Router();
const { captureMessage, sendMessage } = require('../controllers/securityController');

router.post('/capture-message', captureMessage);
router.post('/send-message', sendMessage);

module.exports = router;
