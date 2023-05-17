import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const currenciesRepository = {};
const context = "destiny Countries PG Repository";

currenciesRepository.getOriginCurrenciesByCountry = async (idCountry) => {
  try {
    logger.info(`[${context}]: Getting origin currencies by Country from db`);
    ObjLog.log(`[${context}]: Getting origin currencies by Country from db`);
    await poolSM.query("SET SCHEMA 'msg_app'");
    const resp = await poolSM.query(
      `select * from msg_app.sp_ms_currencies_get_by_country_origin('{${idCountry}}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

currenciesRepository.getDestinyCurrenciesByCountry = async (idCountry) => {
  try {
    logger.info(`[${context}]: Getting destiny currencies by Country from db`);
    ObjLog.log(`[${context}]: Getting destiny currencies by Country from db`);
    await poolSM.query("SET SCHEMA 'msg_app'");
    const resp = await poolSM.query(
      `select * from msg_app.sp_ms_currencies_get_by_country_destiny('{${idCountry}}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

currenciesRepository.getCurrenciesByType = async (type) => {
  try {
    logger.info(`[${context}]: Getting currencies by type from db`);
    ObjLog.log(`[${context}]: Getting currencies by type from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `select * from sec_cust.sp_get_currencies_by_type(${type ? `'${type}'` : null})`
    );
    return resp.rows[0].sp_get_currencies_by_type;
  } catch (error) {
    throw error;
  }
};

export default currenciesRepository;
