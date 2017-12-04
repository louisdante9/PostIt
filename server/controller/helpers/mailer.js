'use strict';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import dotenv from 'dotenv';

//config setup
dotenv.config();
const options = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secured: true,
  auth: {
        user: process.env.SMTPUSER,
        pass: process.env.PASS
    }
    
};


export const sendMail = (sender, reciever, subject, content) => {
  const transporter = nodemailer.createTransport(smtpTransport(options));
  console.log(options.auth);
  const mailOptions = {
    to: reciever,
    from: sender,
    subject: subject,
    text: content,
    html: content
 };

 transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
}
export const  resetSuccessfulResetMail = (email) => {
  const sender =  '"Post It App" <notification@postit.com>';
  const subject =  'Your Password has been changed';
  const content =  'This email confirms that your new POSTIT password has been set.\n\n You can now access your Account.';

sendMail(sender, email, subject, content);
}

export const passwordResetMail = (email, token, host) => {
    const sender =  '"Post It App" <notification@postit.com>';
    const subject =  'Password Reset';
    const content = `You are receiving this because you (or someone) 
    have requested the reset of the password to your account.\n\n
    Please click on the following link or paste this into your browser 
    to complete the process: \n\n
    http://${host}/resetpassword/${token}\n\n
    If you did not request this, please ignore this mail and your 
    password will remain unchanged.`;

  sendMail(sender, email, subject, content);

}

 const priorityMail = (users) => {
  let user = users[0];
  const to = users.map(eachUser => eachUser['User.email']).join(', ');
  const sender = '"Post It App" <notification@postit.com>';
  const subject = 'Message Posted';
  const content = `You have a new message in ${user['Group.name']}`;

   sendMail(sender, to, subject, content);
 }
 export default priorityMail;