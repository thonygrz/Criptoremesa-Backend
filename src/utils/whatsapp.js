import axios from 'axios';
import { env } from "./enviroment";
import { logger } from "./logger";
const https = require('https');

const context = "WHATSAPP MODULE";

const agent = new https.Agent({
  rejectUnauthorized: false
});

export default {
    sendWhatsappMessage: async (tlf,msg) => {
      logger.info(`[${context}]: Sending Whatsapp message`)
      let url = `${env.MESSAGE_SERVER_BASE_URL}/chats/promo/send`
      console.log('url',url)
      let body = {
        chats: [
          {
            type: 'whatsapp',
            number: tlf,
            conn: 6
          }
        ],
        msg
      }
      try {
        let resp = (await axios.post(url,body, { httpsAgent: agent })).data
        console.log('resp: ',resp)
        return resp;
      } catch (error) {
        return error;
      }
    },
    sendGroupWhatsappMessage: async (msg) => {
      logger.info(`[${context}]: Sending group Whatsapp message`)
      let url = `${env.MESSAGE_SERVER_BASE_URL}/chats/group/send`
      console.log('url',url)
      let body = {
        msg
      }
      try {
        let resp = (await axios.post(url,body, { httpsAgent: agent })).data
        console.log('resp: ',resp)
        return resp;
      } catch (error) {
        return error;
      }
    },

};