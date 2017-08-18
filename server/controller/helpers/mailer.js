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
    
}

export default function mailer(users) {
  let user = users[0];
  const to = users.map(eachUser => eachUser['User.email']).join(', ');
  console.log(to, 'testing email');
    const transporter = nodemailer.createTransport(smtpTransport(options));
    console.log(options.auth);
    const mailOptions = {
      from: '"Post It App" <notification@postit.com>',
      to,
      subject: 'Message Posted',
      text: `You have a new message in ${user['Group.name']}`,
      html: `<b>You have a new message in ${user['Group.name']} group. Kindly log into the application to view.</b>`
   };
  
   transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }