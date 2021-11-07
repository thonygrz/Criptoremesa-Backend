import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const doc_typesPGRepository = {};
const context = "doc_types PG Repository";

doc_typesPGRepository.getDocTypes = async () => {
  try {
    logger.info(`[${context}]: Getting doc_types client from db`);
    ObjLog.log(`[${context}]: Getting doc_types client from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sec_cust.v_ident_doc_type_get_active()`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

export default doc_typesPGRepository;
