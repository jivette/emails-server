const credentials = {
    host: 'smtp.mailtrap.io',
        port: 2525,
            auth: {
        user: 'faefb904d28c7b',
            pass: 'e3962cd0d16f21'
    }
}

const message = {
    from: 'ijuarez@masterdevel.com', // Sender address
    to: 'ijuarez@masterdevel.com',         // List of recipients
    subject: 'Design Your Model S | Tesla', // Subject line
    text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
};

module.exports = {
    credentials,
    message
}