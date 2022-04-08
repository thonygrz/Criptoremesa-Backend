import axios from 'axios';
import { env } from "../utils/enviroment";

export default {
  sendForgotPasswordMail: async (body) => {
    try {
      let resp = await axios.post(`${env.MAIL_SENDER}/sendForgotPasswordMail`,body)
      console.log('Desde axios: ',resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  sendSignUpMail: async (body) => {
    try {
      let resp = await axios.post(`${env.MAIL_SENDER}/sendSignUpMail`,body)
      console.log('Desde axios: ',resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  sendAmbassadorMail: async (body) => {
    try {
      let resp = await axios.post(`${env.MAIL_SENDER}/sendAmbassadorMail`,body)
      console.log('Desde axios: ',resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
