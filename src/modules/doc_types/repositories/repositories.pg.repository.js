import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const doc_typesPGRepository = {};
const context = "doc_types PG Repository";

doc_typesPGRepository.getdoc_types = async () => {
  try {
    logger.info(`[${context}]: Getting doc_types from db`);
    ObjLog.log(`[${context}]: Getting doc_types from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM sec_emp.v_ident_doc_type_get_active()`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

doc_typesPGRepository.getdoc_typesClient = async () => {
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

doc_typesPGRepository.getDocTypesLevelOne = async () => {
  try {
    logger.info(`[${context}]: Getting doc_types client from db`);
    ObjLog.log(`[${context}]: Getting doc_types client from db`);
    let doc_types;
    let finalOBJ = {};
    let resp;
    await pool.query("SET SCHEMA 'sec_cust'");
    resp = await pool.query(
      `SELECT * FROM sec_cust.v_ident_doc_type_get_active()`
    );
    doc_types = resp.rows;
    finalOBJ = {
      doc_types,
    };
    console.log("FINALOBJ: ", finalOBJ);
    return finalOBJ;
  } catch (error) {
    throw error;
  }
};

export default doc_typesPGRepository;
