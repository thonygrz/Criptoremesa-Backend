import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const countriesRepository = {};
const context = "countries PG Repository";

countriesRepository.getDestinyCountries = async () => {
  try {
    logger.info(`[${context}]: Getting resid_countries from db`);
    ObjLog.log(`[${context}]: Getting resid_countries from db`);
    await poolSM.query("SET SCHEMA 'msg_app'");
    const resp = await poolSM.query(
      `SELECT * FROM msg_app.sp_ms_countries_get_destiny_countries()`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

countriesRepository.countriesCurrencies = async () => {
  try {
    logger.info(`[${context}]: Getting countries and currencies from db`);
    ObjLog.log(`[${context}]: Getting countries and currencies from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_get_countries_currencies()`
    );
    if (resp.rows[0].sp_get_countries_currencies)
      return resp.rows[0].sp_get_countries_currencies;
    else return null;
  } catch (error) {
    throw error;
  }
};

export default countriesRepository;
