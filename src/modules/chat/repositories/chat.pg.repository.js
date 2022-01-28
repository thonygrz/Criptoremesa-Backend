import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const chatPGRepository = {};
const context = "chat PG Repository";

chatPGRepository.sendMessage = async (body) => {
  try {
    logger.info(`[${context}]: Sending message to db`);
    ObjLog.log(`[${context}]: Sending message to db`);
    const resp = await pool.query(
      `SELECT * FROM msg_app.sp_app_msg_insert('${body.email_user}',
                                               '${body.emp_username}',
                                               '${body.message_body}',
                                               '${body.file_path}',
                                               '${body.msg_date}',
                                               '${body.is_sent}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

export default chatPGRepository;