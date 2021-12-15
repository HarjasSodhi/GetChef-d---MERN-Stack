var nodemailer = require('nodemailer');
const { Mail_Pass, Mail_id } = require('../Secret');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Mail_id,
        pass: Mail_Pass
    }
});

var mailOptions = {
    from: `"FoodApp By Harjas Sodhi" <${Mail_id}>`,
    to: '',
    subject: '',
    text: ''
};

module.exports = {
    transporter,
    mailOptions
}