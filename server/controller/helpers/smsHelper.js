
import Nexmo from 'nexmo';
import dotenv from 'dotenv';

//config setup
dotenv.config();

const nexmo = new Nexmo({
   apiKey: process.env.API_KEY,
   apiSecret: process.env.API_SECRET,

 });

const handleResponse = (error, responseData) => {
  if (error) {
    console.log(error);
  } else {
    console.log(responseData);
  }
};

 export default function smsSender(smsObjects){
   console.log(smsObject);
 let smsObject = smsObjects[0];

  nexmo.message.sendSms(
    'Post-It App', smsObject['User.phone'],
    `A critical message has been posted in ${smsObject['Group.name']}`,
    handleResponse
  );
 }