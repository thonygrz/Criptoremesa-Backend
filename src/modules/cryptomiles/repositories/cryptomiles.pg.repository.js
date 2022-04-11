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
                                              '${body.trans_description}',
                                              '${body.trans_comment}',
                                              ${body.id_operation},
                                              ${body.operation_type}
                                              )`
    );
    return resp.rows[0].sp_ms_cryptomiles_insert;
  } catch (error) {
    throw error;
  }
};

export default cryptomilesPGRepository;
