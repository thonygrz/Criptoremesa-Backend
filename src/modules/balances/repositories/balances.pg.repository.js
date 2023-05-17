import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const balancesPGRepository = {};
const context = "balances PG Repository";

balancesPGRepository.getBalances = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting balances from db`);
    ObjLog.log(`[${context}]: Getting balances from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_get_balances_by_user(
                                              '${email_user}'
                                            )`
    );
    return resp.rows[0].sp_get_balances_by_user;
  } catch (error) {
    throw error;
  }
};

export default balancesPGRepository;
