# Airbit - Email Landing
 
## Setup 

```
npm install

node index.js
```

## Structure

* controllers
* models
* routes
* services

## Configuration environment

1. Create a new file with the name .env
```
API_KEY = ********
DOMAIN = ********
```
## Add methods and export index.ts from Controllers 

```
const sendEmail = require('./sendEmail.controller')

module.exports = {
    sendEmail,
    ...
}
```
##  Add methods and export index.ts from Services 
```
const sendEmail = require('./sendEmail.service')

module.exports = {
    sendEmail
}
```
##  Add routes and export the complete router  
```
const express = require('express');
const sendEmail = require('../controllers');
const router = express.Router();

router.post('/contact', sendEmail.sendEmail.getData);

module.exports = router;

```
