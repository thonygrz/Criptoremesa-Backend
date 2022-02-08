import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const chatPGRepository = {};
const context = "chat PG Repository";

chatPGRepository.sendMessage = async (body) => {
  try {
    logger.info(`[${context}]: Sending message to db`);
    ObjLog.log(`[${context}]: Sending message to db`);
    console.log('BODY EN REPOSITORY: ',body)
    const resp = await pool.query(
      `SELECT * FROM msg_app.sp_app_msg_insert(null,
                                               null,
                                               $$${JSON.stringify(body.message_body)}$$,
                                               null,
                                               '${body.msg_date}',
                                               ${body.is_sent},
                                               '${body.uniq_id}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

chatPGRepository.getMessages = async (user_email) => {
  try {
    logger.info(`[${context}]: Getting messages from db`);
    ObjLog.log(`[${context}]: Getting messages from db`);
    const resp = await pool.query(
      `SELECT * FROM msg_app.sp_chat_msgs_get_by_email('${user_email}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

export default chatPGRepository;
