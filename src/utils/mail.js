import axios from 'axios';
import { env } from "../utils/enviroment";
import { poolSM } from "../../src/db/pg.connection";
import { logger } from "../utils/logger";

async function log(body,response) {
  try {
    logger.info(`[${context}]: Logging mail info in database`)
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(`SELECT * FROM sp_mail_logs_insert_call_to_mail_server(
                                                                                              ($1),
                                                                                              '${response}'
                                                                                          )`,
                                                                                          [body]);
    return resp.rows[0];
  } catch (error) {
    log(body,error)
    logger.error(error);
    throw error;
  }
}

export default {
  sendForgotPasswordMail: async (body) => {
    try {
      let resp = await axios.post(`${env.MAIL_SENDER}/sendForgotPasswordMail`,body)
      console.log('Desde axios: ',resp.data);
      log(body,resp.data)
      return resp.data;
    } catch (error) {
      log(body,error)
      console.log(error);
      return error;
    }
  },
  sendSignUpMail: async (body) => {
    try {
      let resp = await axios.post(`${env.MAIL_SENDER}/sendSignUpMail`,body)
      console.log('Desde axios: ',resp.data);
      log(body,resp.data)
      return resp.data;
    } catch (error) {
      log(body,error)
      console.log(error);
      return error;
    }
  },
  sendAmbassadorMail: async (body) => {
    try {
      let resp = await axios.post(`${env.MAIL_SENDER}/sendAmbassadorMail`,body)
      console.log('Desde axios: ',resp.data);
      log(body,resp.data)
      return resp.data;
    } catch (error) {
      log(body,error)
      console.log(error);
      return error;
    }
  }
};