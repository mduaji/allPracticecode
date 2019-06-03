var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mduaji10@gmail.com',
        pass: 'aji10964'
    }
});

var mailOptions = {
    from: 'mduaji10@gmail.com',
    to: 'ajithc1096@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Your Gmail Password',
    html:'<h1> password   :Ajith<h1>'
   
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});




