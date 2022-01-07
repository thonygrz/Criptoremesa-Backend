import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const beneficiariesPGRepository = {};
const context = "beneficiaries PG Repository";

beneficiariesPGRepository.getUserFrequentBeneficiaries = async (emailUser) => {
  try {
    logger.info(`[${context}]: Getting user frequent beneficiaries from db`);
    ObjLog.log(`[${context}]: Getting user frequent beneficiaries from db`);
    await pool.query("SET SCHEMA 'prc_mng'");
    const resp = await pool.query(
      `SELECT * FROM prc_mng.get_all_frequents_beneficiaries('${emailUser}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

export default beneficiariesPGRepository;
