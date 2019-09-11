const { sendEmail } = require('../services')
const { contact } = sendEmail;

const getData = async (req, res, next) => {
    try {
        console.log("controller");
        const respuesta = await contact(req, res);
        console.log(respuesta);
        res.sendStatus(respuesta.codigo);
        next();
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getData
}