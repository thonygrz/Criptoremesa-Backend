import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const all_countriesPGRepository = {};
const context = "all_countries PG Repository";

all_countriesPGRepository.getall_countries = async () => {
  try {
    logger.info(`[${context}]: Getting all_countries from db`);
    ObjLog.log(`[${context}]: Getting all_countries from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM sec_emp.v_all_countries_get_active()`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

export default all_countriesPGRepository;
