import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import fs from 'fs'

const wholesale_partnersRepository = {};
const context = "wholesale_partners PG Repository";

wholesale_partnersRepository.insertWholesalePartnerInfo = async (body) => {
  try {
    logger.info(`[${context}]: Inserting wholesale_partner info from db`);
    ObjLog.log(`[${context}]: Inserting wholesale_partner info from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");

    const resp = await poolSM.query(
      `select * from sec_cust.sp_insert_wholesale_partner_info(
                                                                ${body.name === 'null' ? null : `'${body.name}'`},
                                                                ${body.slug === 'null' ? null : `'${body.slug}'`},
                                                                ${body.logo === 'null' ? null : `'${body.logo}'`},
                                                                ${body.theme === 'null' ? null : `'${body.theme}'`},
                                                                ${body.percent_profit === 'null' ? null : body.percent_profit},
                                                                ${body.email_user === 'null' ? null : `'${body.email_user}'`}
                                                              )`
    );
    if (resp.rows[0].sp_insert_wholesale_partner_info)
      return resp.rows[0].sp_insert_wholesale_partner_info;
    else 
      []
  } catch (error) {
    throw error;
  }
};

wholesale_partnersRepository.getWholesalePartnerInfo = async (slug) => {
  try {
    logger.info(`[${context}]: Inserting wholesale_partner info from db`);
    ObjLog.log(`[${context}]: Inserting wholesale_partner info from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");

    const resp = await poolSM.query(
      `select * from sec_cust.sp_get_wholesale_partner_info(
                                                                ${slug ? `'${slug}'` : null }
                                                              )`
    );
    if (resp.rows[0].sp_get_wholesale_partner_info){
      let info = resp.rows[0].sp_get_wholesale_partner_info;

      info.logo = fs.readFileSync(
        info.logo
      );
      return resp.rows[0].sp_get_wholesale_partner_info;
    }
    else 
      null
  } catch (error) {
    throw error;
  }
};

wholesale_partnersRepository.getWholesalePartnerRates = async (slug) => {
  try {
    logger.info(`[${context}]: Getting wholesale_partner rates from db`);
    ObjLog.log(`[${context}]: Getting wholesale_partner rates from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");

    const resp = await poolSM.query(
      `select * from sec_cust.sp_get_wholesale_partner_rates(
                                                              '${slug}'
                                                            )`
    );
    if (resp.rows[0].sp_get_wholesale_partner_rates){
      return resp.rows[0].sp_get_wholesale_partner_rates;
    }
    else 
      []
  } catch (error) {
    throw error;
  }
};

wholesale_partnersRepository.getWholesalePartnerClients = async (slug,full) => {
  try {
    logger.info(`[${context}]: Getting wholesale_partner clients from db`);
    ObjLog.log(`[${context}]: Getting wholesale_partner clients from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");

    const resp = await poolSM.query(
      `select * from sec_cust.sp_get_wholesale_partner_clients(
                                                              '${slug}',
                                                              ${full}
                                                            )`
    );
    if (resp.rows[0].sp_get_wholesale_partner_clients){
      return resp.rows[0].sp_get_wholesale_partner_clients;
    }
    else 
      []
  } catch (error) {
    throw error;
  }
};

wholesale_partnersRepository.getWholesalePartnerClientRemittances = async (slug,full) => {
  try {
    logger.info(`[${context}]: Getting wholesale_partner clients remittances from db`);
    ObjLog.log(`[${context}]: Getting wholesale_partner clients remittances from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");

    const resp = await poolSM.query(
      `select * from sec_cust.sp_get_wholesale_partner_client_remittances(
                                                                            '${slug}',
                                                                            ${full}
                                                                          )`
    );
    if (resp.rows[0].sp_get_wholesale_partner_client_remittances){
      return resp.rows[0].sp_get_wholesale_partner_client_remittances;
    }
    else 
      return []
  } catch (error) {
    throw error;
  }
};

wholesale_partnersRepository.changeWholesalePartnerPercentProfit = async (slug,percentProfit) => {
  try {
    logger.info(`[${context}]: Changing wholesale_partner percent profit on db`);
    ObjLog.log(`[${context}]: Changing wholesale_partner percent profit on db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");

    const resp = await poolSM.query(
      `select * from sec_cust.sp_update_percent_profit(
                                                        ${percentProfit},
                                                        '${slug}'
                                                      )`
    );
    if (resp.rows[0].sp_update_percent_profit){
      return resp.rows[0].sp_update_percent_profit;
    }
    else 
      []
  } catch (error) {
    throw error;
  }
};

export default wholesale_partnersRepository;