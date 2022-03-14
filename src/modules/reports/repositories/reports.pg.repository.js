import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const reportsPGRepository = {};
const context = "reports PG Repository";

reportsPGRepository.usersWithMostTransactionsByRangeTimeAndCountry = async (from_date,to_date,id_country) => {
  try {
    logger.info(`[${context}]: Getting reports from db`);
    ObjLog.log(`[${context}]: Getting reports from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sec_cust.report_users_with_most_transactions_by_range_time_and_country(
                                                                                          ${from_date},
                                                                                          ${to_date},
                                                                                          ${id_country}
                                                                                          )`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

reportsPGRepository.usersWithMoneyTransferedByRangeTimeAndCountry = async (from_date,to_date,id_country) => {
  try {
    logger.info(`[${context}]: Getting reports from db`);
    ObjLog.log(`[${context}]: Getting reports from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sec_cust.report_users_with_money_transfered_by_range_time_and_country(
                                                                                          ${from_date},
                                                                                          ${to_date},
                                                                                          ${id_country}
                                                                                          )`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

export default reportsPGRepository;
