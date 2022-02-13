import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const remittancesPGRepository = {};
const context = "remittances PG Repository";

remittancesPGRepository.notificationTypes = async () => {
  try {
    logger.info(`[${context}]: Looking for notification types on db`);
    ObjLog.log(`[${context}]: Looking for notification types on db`);
    await pool.query("SET SCHEMA 'msg_app'");
    const resp = await pool.query(
      `SELECT * FROM sp_ms_user_notification_types()`
    );
    if (resp.rows[0]) return resp.rows[0];
    else return null;
  } catch (error) {
    throw error;
  }
};

remittancesPGRepository.getRemittances = async (emailUser) => {
  try {
    logger.info(`[${context}]: Getting user frequent beneficiaries from db`);
    ObjLog.log(`[${context}]: Getting user frequent beneficiaries from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sp_chat_remittance_get_by_email($$${emailUser}$$,'chat')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

export default remittancesPGRepository;