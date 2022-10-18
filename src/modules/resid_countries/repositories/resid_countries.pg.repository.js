import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const resid_countriesPGRepository = {};
const context = "resid_countries PG Repository";

resid_countriesPGRepository.getresid_countries = async (countriesType) => {
  try {
    logger.info(`[${context}]: Getting resid_countries from db`);
    ObjLog.log(`[${context}]: Getting resid_countries from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    logger.silly(countriesType)
    const resp = await poolSM.query(
      `SELECT * FROM sec_cust.v_countries_get_criptoremesa_active('${countriesType}')`
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
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM SP_GET_RESID_COUNTRY_ISO_CODE_BY_ID(${id})`
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
};

resid_countriesPGRepository.isPolExp = async (id) => {
  try {
    logger.info(`[${context}]: Checking country in db`);
    ObjLog.log(`[${context}]: Checking country in db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM SP_IS_POL_EXP_COUNTRY(${id})`
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
};

export default resid_countriesPGRepository;
