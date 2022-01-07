import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const destinyCountriesRepository = {};
const context = "destiny Countries PG Repository";

destinyCountriesRepository.getDestinyCountries = async () => {
  try {
    logger.info(`[${context}]: Getting resid_countries from db`);
    ObjLog.log(`[${context}]: Getting resid_countries from db`);
    await pool.query("SET SCHEMA 'msg_app'");
    const resp = await pool.query(
      `SELECT * FROM msg_app.sp_ms_countries_get_destiny_countries()`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

export default destinyCountriesRepository;
