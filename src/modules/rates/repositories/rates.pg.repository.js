import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const ratesPGRepository = {};
const context = "rates PG Repository";

ratesPGRepository.getRate = async (body) => {
  try {
    logger.info(`[${context}]: Looking for rate on db`);
    ObjLog.log(`[${context}]: Looking for rate on db`);
    await poolSM.query("SET SCHEMA 'msg_app'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_ms_cr_rate_get(
                                      ${body.id_currency_origin},
                                      ${body.id_currency_destiny},
                                      ${body.id_country_origin},
                                      ${body.id_country_destiny},
                                      ${body.id_rate_type}
                                      )`
    );
    console.log("ROWS: ", resp.rows);
    if (resp.rows.length > 1) return resp.rows;
    else if ((resp.rows.length = 1)) return resp.rows[0].sp_ms_cr_rate_get;
    else return null;
  } catch (error) {
    throw error;
  }
};

ratesPGRepository.rangeRates = async () => {
  try {
    logger.info(`[${context}]: Looking for range Rates on db`);
    ObjLog.log(`[${context}]: Looking for range Rates on db`);
    await poolSM.query("SET SCHEMA 'msg_app'");
    const resp = await poolSM.query(`SELECT * FROM sp_get_range_rates()`);
    if (resp.rows[0].sp_get_range_rates) return resp.rows[0].sp_get_range_rates;
    else return null;
  } catch (error) {
    throw error;
  }
};

ratesPGRepository.rateTypes = async () => {
  try {
    logger.info(`[${context}]: Looking for rate Types on db`);
    ObjLog.log(`[${context}]: Looking for rate Types on db`);
    await poolSM.query("SET SCHEMA 'msg_app'");
    const resp = await poolSM.query(`SELECT * FROM sp_ms_cr_rate_type_get()`);
    if (resp.rows) return resp.rows;
    else return null;
  } catch (error) {
    throw error;
  }
};

ratesPGRepository.userRates = async (body,emailUser) => {
  try {
    logger.info(`[${context}]: Looking for userRates on db`);
    ObjLog.log(`[${context}]: Looking for userRates on db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sec_cust.sp_ms_cr_rate_get_valid(
        ${body.id_origin_country},
        ${body.id_origin_currency},
        ${body.id_destiny_country},
        ${body.id_destiny_currency},
        '${emailUser}'
      )`
    );
    if (resp.rows) {
      return resp.rows[0].sp_ms_cr_rate_get_valid;
    } else return null;
  } catch (error) {
    throw error;
  }
};

ratesPGRepository.fullRates = async (body,emailUser) => {
  try {
    logger.info(`[${context}]: Looking for fullRates on db`);
    ObjLog.log(`[${context}]: Looking for fullRates on db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sec_cust.sp_get_full_rates(
        ${body.id_origin_country},
        ${body.id_origin_currency},
        ${body.id_destiny_country},
        ${body.id_destiny_currency},
        '${emailUser}'
      )`
    );
    if (resp.rows) {
      return resp.rows[0].sp_get_full_rates;
    } else return null;
  } catch (error) {
    throw error;
  }
};

ratesPGRepository.promo = async (body) => {
  try {
    logger.info(`[${context}]: Looking for promo on db`);
    ObjLog.log(`[${context}]: Looking for promo on db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sec_cust.sp_get_special_rates_by_country_and_currency(
        ${body.id_origin_country},
        ${body.id_origin_currency},
        ${body.id_destiny_country},
        ${body.id_destiny_currency}
      )`
    );
    if (resp.rows) {
      return resp.rows[0].sp_get_special_rates_by_country_and_currency;
    } else return null;
  } catch (error) {
    throw error;
  }
};

export default ratesPGRepository;
