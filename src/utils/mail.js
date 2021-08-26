import axios from 'axios';
import { env } from "../utils/enviroment";

export default {
    sendMail: async (body) => {
      try {
        let resp = await axios.post(`${env.MAIL_SENDER}/sendMail`,body)
        console.log('Desde axios: ',resp.data);
        return resp.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  };