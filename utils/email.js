const nodemailer = require('nodemailer');

module.exports = class Email {

  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Synergy Support <${process.env.SENDER_EMAIL}>`;
    this.user = user;
  }
  newTransport() {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }

  async send(subject, html, text) {
    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text
    }
    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(randomPassword) {
    const message = `Hi ${this.user.name},
      
      Please refer the login credentials 
      
      email : ${this.user.email}
      Password : ${randomPassword}
                      
      Please login and update password for more security
                             
      Thanks!`

    await this.send('Welcome to Syenergy', null, message)
  }

  async sendPasswordReset() {
    const message = `Forgot your password? 

    Please follow the below link to reset your password

    ${this.url}
    If you didn't forget your password, please ignore this email!`;

    await this.send('Reset Password', null, message);
  }
}

// const sendEmail = async options => {
//   // 1) Create a transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD
//     }
//   });

//   // 2) Define the email options
//   const mailOptions = {
//     from: 'Teny Thomas <teny@dataguardnxt.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message
//     // html:
//   };

//   // 3) Actually send the email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD
//   }
//   // Activate in gmail "less secure app" option
//   // Gmail is not a good option for production application and could only send 500/day and there is chance to quickly marked as spam
//   // Sendgrid and mailgun are good service for production app
// });
