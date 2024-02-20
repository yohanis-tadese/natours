const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
  // 1) Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email optins
  const mailOptions = {
    from: 'Yohanis Tadese <jhon06@gmail.com>',
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  //3 ) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
