import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const banksRepository = {};
const context = "banks PG Repository";

banksRepository.getOriginBanks = async (countryId,payMethodId,currencyId) => {
  try {
    logger.info(`[${context}]: Getting origin banks from db`);
    ObjLog.log(`[${context}]: Getting origin banks from db`);
    await pool.query("SET SCHEMA 'msg_app'");
    const resp = await pool.query(
      `select * from sp_ms_banks_get_origin_banks('{${countryId}}','{${currencyId}}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

banksRepository.getDestinyBanks = async (countryId,payMethodId,currencyId) => {
  try {
    logger.info(`[${context}]: Getting destiny banks from db`);
    ObjLog.log(`[${context}]: Getting destiny banks from db`);
    await pool.query("SET SCHEMA 'msg_app'");
    const resp = await pool.query(
      `select * from sp_ms_banks_get_destiny_banks('{${countryId}}','{${currencyId}}','{${payMethodId}}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

export default banksRepository;
