
import Nexmo from 'nexmo';
import dotenv from 'dotenv';
dotenv.config();

const nexmo = new Nexmo({
   apiKey: process.env.API_KEY,
   apiSecret: process.env.API_SECRET,

 });

const handleResponse = (error, responseData) => {
  if (error) {
    return error;
  } else {
    return responseData;
  }
};

/**
  * getAllUnreadMessage
  * @function
  * @param {integer} smsObjects, 
  * @returns {Object} - Returns an object
  */
 const smsSender = (smsObjects) => {
 let smsObject = smsObjects[0];
  nexmo.message.sendSms(
    'Post-It App', smsObject['User.phone'],
    `A critical message has been posted in ${smsObject['Group.name']}`,
    handleResponse
  );
 }
 export default smsSender;