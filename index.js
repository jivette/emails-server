
const express = require("express");
const routes = require('./routes');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
const cors = require('cors')
app.use(cors())

app.use('/api', routes)

app.get('*', (req, res) => {
    res.end('404');
});

app.listen(4000, () => {
    console.log("El servidor está inicializado en el puerto 4000");
});
