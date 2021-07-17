import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const resid_countriesPGRepository = {};
const context = "resid_countries PG Repository";

resid_countriesPGRepository.getresid_countries = async () => {
  try {
    logger.info(`[${context}]: Getting resid_countries from db`);
    ObjLog.log(`[${context}]: Getting resid_countries from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM sec_emp.v_countries_get_sixmap_active()`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

resid_countriesPGRepository.getresid_countriesClient = async () => {
  try {
    logger.info(`[${context}]: Getting resid_countries from db`);
    ObjLog.log(`[${context}]: Getting resid_countries from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sec_cust.v_countries_get_sixmap_active()`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

resid_countriesPGRepository.getid_by_name = async (name) => {
  try {
    logger.info(`[${context}]: Getting id from db`);
    ObjLog.log(`[${context}]: Getting id from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM sec_emp.v_countries_get_id_by_name(${name})`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

resid_countriesPGRepository.getISOCodeById = async (id) => {
  try {
    logger.info(`[${context}]: Getting id from db`);
    ObjLog.log(`[${context}]: Getting id from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM SP_GET_RESID_COUNTRY_ISO_CODE_BY_ID(${id})`
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
};

export default resid_countriesPGRepository;
