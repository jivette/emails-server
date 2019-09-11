const express = require('express');
const sendEmail = require('../controllers');
const router = express.Router();
router.post('/contact', sendEmail.getData);

module.exports = router;