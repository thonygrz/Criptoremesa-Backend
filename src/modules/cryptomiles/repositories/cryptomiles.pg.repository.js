import { poolSM, poolCR } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const cryptomilesPGRepository = {};
const context = "cryptomiles PG Repository";

cryptomilesPGRepository.insertCryptomile = async (body) => {
  try {
    logger.info(`[${context}]: Getting cryptomiles client from db`);
    ObjLog.log(`[${context}]: Getting cryptomiles client from db`);
    await poolSM.query("SET SCHEMA 'basics'");
    const resp = await poolCR.query(
      `SELECT * FROM basics.sp_ms_cryptomiles_insert(
                                              ${body.amount},
                                              '${body.email_user}',
                                              '${body.emp_username}',
                                              '${body.trans_type}',
                                              ${body.trans_description === null ? null : `'${body.trans_description}'`},
                                              ${body.trans_comment === null ? null : `'${body.trans_comment}'`},
                                              ${body.id_operation},
                                              ${body.operation_type},
                                              ${body.id_currency},
                                              ${body.id_country},
                                              ${body.was_charged}
                                              )`
    );
    return resp.rows[0].sp_ms_cryptomiles_insert;
  } catch (error) {
    throw error;
  }
};

cryptomilesPGRepository.getCryptomiles = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting cryptomiles client from db`);
    ObjLog.log(`[${context}]: Getting cryptomiles client from db`);
    await poolSM.query("SET SCHEMA 'basics'");
    const resp = await poolCR.query(
      `SELECT * FROM basics.sp_ms_cryptomiles_get(
                                              '${email_user}'
                                              )`
    );
    return resp.rows[0].sp_ms_cryptomiles_get;
  } catch (error) {
    throw error;
  }
};

cryptomilesPGRepository.deactivateCryptomiles = async (email_user) => {
  try {
    logger.info(`[${context}]: Deactivating cryptomiles client from db`);
    ObjLog.log(`[${context}]: Deactivating cryptomiles client from db`);
    await poolSM.query("SET SCHEMA 'basics'");
    const resp = await poolCR.query(
      `SELECT * FROM basics.sp_cryptomiles_deactivate_by_id(
                                              '${email_user}'
                                              )`
    );
    return resp.rows[0].sp_cryptomiles_deactivate_by_id;
  } catch (error) {
    throw error;
  }
};

cryptomilesPGRepository.activateCryptomiles = async (email_user) => {
  try {
    logger.info(`[${context}]: Activating cryptomiles client from db`);
    ObjLog.log(`[${context}]: Activating cryptomiles client from db`);
    await poolSM.query("SET SCHEMA 'basics'");
    const resp = await poolCR.query(
      `SELECT * FROM basics.sp_cryptomiles_activate_by_id(
                                              '${email_user}'
                                              )`
    );
    return resp.rows[0].sp_cryptomiles_activate_by_id;
  } catch (error) {
    throw error;
  }
};

cryptomilesPGRepository.getAllCryptomiles = async (body) => {
  try {
    logger.info(`[${context}]: Getting all cryptomiles from db`);
    ObjLog.log(`[${context}]: Getting all cryptomiles from db`);
    await poolSM.query("SET SCHEMA 'basics'");
    console.log('BODY EN REPOOOOO',body)
    const resp = await poolCR.query(
      `SELECT * FROM basics.sp_cryptomiles_get_all(
                                                  ${body.active},
                                                  ${body.email_user == 'null' ? null : `'${body.email_user}'`},
                                                  ${body.id_currency == 'null' ? null : body.id_currency},
                                                  ${body.id_country == 'null' ? null : body.id_country},
                                                  ${body.start_date == 'null' ? null : body.start_date},
                                                  ${body.end_date == 'null' ? null : body.end_date}
                                                  )`
    );
    return resp.rows[0].sp_cryptomiles_get_all;
  } catch (error) {
    throw error;
  }
};

export default cryptomilesPGRepository;
