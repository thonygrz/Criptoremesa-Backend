import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const currenciesRepository = {};
const context = "destiny Countries PG Repository";

currenciesRepository.getOriginCurrenciesByCountry = async (idCountry) => {
  try {
    logger.info(`[${context}]: Getting origin currencies by Country from db`);
    ObjLog.log(`[${context}]: Getting origin currencies by Country from db`);
    await pool.query("SET SCHEMA 'msg_app'");
    const resp = await pool.query(
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
    await pool.query("SET SCHEMA 'msg_app'");
    const resp = await pool.query(
      `select * from msg_app.sp_ms_currencies_get_by_country_destiny('{${idCountry}}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};



export default currenciesRepository;
