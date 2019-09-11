
const express = require("express");
const routes = require('./routes');
const app = express();

const cors = require('cors')
app.use(cors())

app.use('/api', routes)


app.use(function (req, res, next) {
    const respuesta = {
        error: true,
        codigo: 404,
        mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});

app.listen(4000, () => {
    console.log("El servidor está inicializado en el puerto 4000");
});