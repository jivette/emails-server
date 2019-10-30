const { sendEmail } = require('../services')
const { contact } = sendEmail;

const getData = async (req, res, next) => {
    try {
        await contact(req, res, next);
    } catch (error) {
        res.status(500).send({
            error: false,
            code: 500,
            message: 'Your request was not completed, try later.',
        });

        res.status(500);
        next(error);
    }
}


module.exports = {
    getData
}