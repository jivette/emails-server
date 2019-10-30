const modelEmail = require('../models/email.model');

let response = {
    error: false,
    code: 200,
    message: ''
};

const contact = async (req, res, next) => {
    const requestData = req.body.data;
    const isMissingFields = Object.keys(requestData).filter(key => typeof requestData[key] != 'object').every(key => (requestData[key] !== '' && typeof requestData[key] !== 'object' ));
    
    if (!isMissingFields) {
        res.status(400).send({
            error: true,
            code: 400,
            message: 'You must fill in the required fields!'
        });
        next();
    } else {
        await sendEmail(req.body.data, res, next);
    }

    return response;
}

async function sendEmail(data, res, next) {
    modelEmail.message.html = `
        <table style="width: 100%; border-collapse: inherit; max-width: 768px; margin: 0 auto;">
            <tr style="background-color: rgba(128, 128, 128, 0.17);"> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> firstname </td>
                <td style="padding: 10px;">${data.firstname}</td> 
            </tr>
            <tr> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> email </td>
                <td style="padding: 10px;">${data.email}</td> 
            </tr>
            <tr  style="background-color: rgba(128, 128, 128, 0.17);"> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> country </td>
                <td style="padding: 10px;">${data.country}</td> 
            </tr>
            <tr> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> countryCode </td>
                <td style="padding: 10px;">${data.countryCode}</td> 
            </tr>
            <tr  style="background-color: rgba(128, 128, 128, 0.17);"> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> phone </td>
                <td style="padding: 10px;">${data.phone}</td> 
            </tr>
            <tr> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> doYouNeed </td>
                <td style="padding: 10px;">${data.doYouNeed}</td> 
            </tr>
            <tr  style="background-color: rgba(128, 128, 128, 0.17);"> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> referal </td>
                <td style="padding: 10px;">${data.registered.referal}</td> 
            </tr>
            <tr> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> Sponsor's First name </td>
                <td style="padding: 10px;">${data.registered.provider.firstname}</td> 
            </tr>
            <tr  style="background-color: rgba(128, 128, 128, 0.17);"> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> Sponsor's Last name </td>
                <td style="padding: 10px;">${data.registered.provider.lastname}</td> 
            </tr>
            <tr> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;">  Sponsor's country </td>
                <td style="padding: 10px;">${data.registered.provider.country}</td> 
            </tr>
            <tr  style="background-color: rgba(128, 128, 128, 0.17);"> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> Sponsor's username  </td>
                <td style="padding: 10px;">${data.registered.provider.username}</td> 
            </tr>
            <tr> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> Are you a registered user? </td>
                <td style="padding: 10px;">${data.customService.userRegistered}</td> 
            </tr>
            <tr  style="background-color: rgba(128, 128, 128, 0.17);"> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> username </td>
                <td style="padding: 10px;">${data.customService.registered.username}</td> 
            </tr>
            <tr> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> Why aren't you using the ticket system?</td>
                <td style="padding: 10px;">${data.customService.registered.systemTicket}</td> 
            </tr>
            <tr  style="background-color: rgba(128, 128, 128, 0.17);"> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> contactType </td>
                <td style="padding: 10px;">${data.contactType}</td> 
            </tr>
            <tr> 
                <td style="border-right: 1px solid rgba(191, 191, 191, 0.25); font-weight: bold; padding: 10px;"> message </td>
                <td style="padding: 10px;">${data.message}</td> 
            </tr>
        <table>`;

    const mailgun = modelEmail.instanceMailgun;
    await mailgun.messages().send(modelEmail.message, function (error, body) {
        if (error) {
            res.status(400).send({
                error: false,
                code: 400,
                message: 'The email has not been sent.',
            });
            next();
        } else {
            res.status(200).send({
                error: false,
                code: 200,
                message: 'The email has been sent.',
            });
            next();
        }
    });
}

module.exports = {
    contact
}