import axios from 'axios';
import { env } from "../utils/enviroment";
import { poolSM } from "../../src/db/pg.connection";
import { logger } from "../utils/logger";

const context = "MAIL MODULE";

async function log(email_user,url,body,response) {
  try {
    logger.info(`[${context}]: Logging mail info in database`)
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(`SELECT * FROM sp_mail_logs_insert_call_to_mail_server(
                                                                                              '${email_user}',
                                                                                              '${url}',
                                                                                              ($1),
                                                                                              '${response}'
                                                                                          )`,
                                                                                          [body]);
    return resp.rows[0];
  } catch (error) {
    log(body.email_user,url,body,error)
    logger.error(error);
    throw error;
  }
}

export default {
  sendForgotPasswordMail: async (body) => {
    let url = `${env.MAIL_SENDER}/sendForgotPasswordMail`
    try {
      let resp = await axios.post(url,body)
      console.log('Desde axios: ',resp.data);
      log(body.email_user,url,body,resp.data)
      return resp.data;
    } catch (error) {
      log(body.email_user,url,body,error)
      console.log(error);
      return error;
    }
  },
  sendSignUpMail: async (body) => {
    let url = `${env.MAIL_SENDER}/sendSignUpMail`
    try {
      let resp = await axios.post(url,body)
      console.log('Desde axios: ',resp.data);
      log(body.email_user,url,body,resp.data)
      return resp.data;
    } catch (error) {
      log(body.email_user,url,body,error)
      console.log(error);
      return error;
    }
  },
  sendAmbassadorMail: async (body) => {
    let url = `${env.MAIL_SENDER}/sendAmbassadorMail`
    try {
      let resp = await axios.post(url,body)
      console.log('Desde axios: ',resp.data);
      log(body.email_user,url,body,resp.data)
      return resp.data;
    } catch (error) {
      log(body.email_user,url,body,error)
      console.log(error);
      return error;
    }
  },
  sendIndustryAlertMail: async (body) => {
    let url = `${env.MAIL_SENDER}/mail`
    try {
      let resp = await axios.post(url,body)
      console.log('Desde axios: ',resp.data);
      log(body.email_user,url,body,resp.data)
      return resp.data;
    } catch (error) {
      log(body.email_user,url,body,error)
      console.log(error);
      return error;
    }
  }
};