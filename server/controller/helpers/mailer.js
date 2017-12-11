' use strict';

import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import dotenv from 'dotenv';

// config setup
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

/**
 * 
 * @description this is a helper method for sending mails generally
 * @param {any} sender 
 * @param {any} reciever 
 * @param {any} subject 
 * @param {any} content 
 * 
 * @return { void }
 */
const sendMail = (sender, reciever, subject, content) => {
  const transporter = nodemailer.createTransport(smtpTransport(options));
  const mailOptions = {
    to: reciever,
    from: sender,
    subject,
    html: content
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return false;
    }
  });
};
/**
 * 
 * @description this helper method to send mails for reset password
 * @param {any} email 
 * 
 * @return { void }
 */
const resetSuccessfulResetMail = (email) => {
  const sender = '"Post It App" <notification@postit.com>';
  const subject = 'Your Password has been changed';
  const content = `<div style="width: 100%; background-color: grey; padding: 2%;">
  <div style="width: 60%; background-color: white; margin: auto;">
    <div style="height: 8%; background-color: #000000; width:100%">
    </div>
    <div style="padding: 8%">
      <div class="next-container" style="border: 2px solid; margin-top:2%; padding: 2%;">
      This email confirms that your new POSTIT password has been set.
      You can now access your Account.
      </div>
      <div style="border-top: 3px solid #004d40;"></div>
      <p style="font-weight: bold; color: #004d40;">PostIt</p>
    </div>
  </div>
</div>`;

  sendMail(sender, email, subject, content);
};

export const passwordResetMail = (email, token, host) => {
  const sender = '"Post It App" <notification@postit.com>';
  const subject = 'Password Reset';
  const content = `<div style="width: 100%; background-color: grey; padding: 2%;">
    <div style="width: 60%; background-color: white; margin: auto;">
      <div style="height: 8%; background-color: #000000; width:100%">
      </div>
      <div style="padding: 8%">
        <div class="row">
        You are receiving this because you (or someone) 
        have requested the reset of the password to your account
        </div>
        <div class="next-container" style="border: 2px solid; margin-top:2%; padding: 2%;">
          Please click on the following link or paste this into your browser 
          to complete the process: http://${host}/resetpassword/${token}
        </div>
        <div style="border-top: 3px solid #004d40;"></div>
        <p style="font-weight: bold; color: #004d40;">PostIt</p>
      </div>
    </div>
  </div>`;
  sendMail(sender, email, subject, content);
};

const priorityMail = (users) => {
  const user = users[0];
  const to = users.map(eachUser => eachUser['User.email']).join(', ');
  const sender = '"Post It App" <notification@postit.com>';
  const subject = 'Message Posted';
  const content = `<div style="width: 100%; background-color: grey; padding: 2%;">
  <div style="width: 60%; background-color: white; margin: auto;">
    <div style="height: 8%; background-color: #000000; width:100%">
    </div>
    <div style="padding: 8%">
      <div class="next-container" style="border: 2px solid; margin-top:2%; padding: 2%;">
      You have a new message from ${user['Group.name']} group
      </div>
      <div style="border-top: 3px solid #004d40;"></div>
      <p style="font-weight: bold; color: #004d40;">PostIt</p>
    </div>
  </div>
</div>`;

  sendMail(sender, to, subject, content);
};
export default priorityMail;