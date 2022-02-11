import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const ratesPGRepository = {};
const context = "rates PG Repository";

ratesPGRepository.getRate = async (body) => {
  try {
    logger.info(`[${context}]: Looking for rate on db`);
    ObjLog.log(`[${context}]: Looking for rate on db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sp_ms_cr_rate_get(
                                      ${body.id_currency_origin},
                                      ${body.id_currency_destiny},
                                      ${body.id_country_origin},
                                      ${body.id_country_destiny},
                                      ${body.id_rate_type}
                                      )`
    );
    if (resp.rows[0]) return resp.rows[0].sp_ms_cr_rate_get;
    else return null;
  } catch (error) {
    throw error;
  }
};


ratesPGRepository.getRangeRates = async () => {
  try {
    logger.info(`[${context}]: Looking for range rates on db`);
    ObjLog.log(`[${context}]: Looking for range rates on db`);
    await pool.query("SET SCHEMA 'msg_app'");
    const resp = await pool.query(
      `SELECT * FROM sp_get_range_rates()`
    );
    if (resp.rows[0]) return resp.rows[0].sp_get_range_rates;
    else return null;
  } catch (error) {
    throw error;
  }
};

export default ratesPGRepository;