import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const reportsPGRepository = {};
const context = "reports PG Repository";

reportsPGRepository.reportAmountSentByBenef = async (params,query) => {
  try {
    logger.info(`[${context}]: Getting report from db`);
    ObjLog.log(`[${context}]: Getting report from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    console.log('params: ',params)
    console.log('query: ',query)
    const resp = await poolSM.query(
      `SELECT * FROM report_amount_sent_by_benef(
                                                    ${query.from_date === 'null' ? null : parseInt(query.from_date)},
                                                    ${query.to_date === 'null' ? null : parseInt(query.to_date)},
                                                    ${query.id_country === 'null' ? null : parseInt(query.id_country)},
                                                    ${query.id_currency === 'null' ? null : parseInt(query.id_currency)},
                                                    ${query.id_beneficiary === 'null' ? null : parseInt(query.id_beneficiary)},
                                                    '${params.email_user}'
                                                )`
    );
    return resp.rows[0].report_amount_sent_by_benef;
  } catch (error) {
    throw error;
  }
};

export default reportsPGRepository;
