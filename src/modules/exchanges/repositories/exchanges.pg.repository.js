import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const exchangesRepository = {};
const context = "exchanges PG Repository";

exchangesRepository.getExchangeRangeRates = async () => {
  try {
    logger.info(`[${context}]: Getting exchanges from db`);
    ObjLog.log(`[${context}]: Getting exchanges from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_get_exchange_range_rates()`
    );
    return resp.rows[0].sp_get_exchange_range_rates.range_rates;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.getExchangeRates = async () => {
  try {
    logger.info(`[${context}]: Getting exchange rates from db`);
    ObjLog.log(`[${context}]: Getting exchange rates from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_get_exchange_rates()`
    );
    return resp.rows[0].sp_get_exchange_rates.rates;
  } catch (error) {
    throw error;
  }
};

export default exchangesRepository;
