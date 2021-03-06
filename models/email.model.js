const express = require("express");
const app = express();

require('dotenv').config()
app.use(express.json());

const message = {
    from: 'Excited User <ijuarez@gmail.com>',
    to: 'ijuarez@gmail.com',
    subject: 'Hello',
    html: ''
};

const instanceMailgun = require('mailgun-js')({ apiKey: process.env.API_KEY, domain: process.env.DOMAIN });

module.exports = {
    message,
    instanceMailgun
}

