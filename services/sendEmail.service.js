const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const modelEmail = require('../models/email.model');
const express = require("express");
const app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded());

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


let isEmpty = false;
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};


let transport = nodemailer.createTransport(modelEmail.credentials);


const contact = async (req, rest) => {
    for (const key in req.body.data) {
        if (req.body.data[key] == '' && (typeof req.body.data[key] != 'object')) {
            isEmpty = true;
            break;
        } else {
            isEmpty = false;
        }
    }

    if (isEmpty == true) {
        console.log('is empty');
        dataMesage = req.body.data;
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Debes llenar las casillas requeridas'
        };
    } else {
        console.log('lleno');
        await sendEmail();
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'El email ha sido enviado',
        };
    }

    return respuesta;
}


function sendEmail() {
    console.log('Send email');

    transport.sendMail(modelEmail.message, function (err, info) {
        if (err) {
            console.log("error " + err)
        } else {
            console.log("info " + info);
        }
    });
}


module.exports = {
    contact
}
