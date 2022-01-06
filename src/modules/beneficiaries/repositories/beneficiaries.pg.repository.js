import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const beneficiariesPGRepository = {};
const context = "beneficiaries PG Repository";

beneficiariesPGRepository.getUserFrequentBeneficiaries = async () => {
  try {
    logger.info(`[${context}]: Getting user frequent beneficiaries from db`);
    ObjLog.log(`[${context}]: Getting user frequent beneficiaries from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sec_cust.v_ident_doc_type_get_active()`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

export default beneficiariesPGRepository;
