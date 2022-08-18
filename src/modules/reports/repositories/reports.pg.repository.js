import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const reportsPGRepository = {};
const context = "reports PG Repository";

reportsPGRepository.reportAmountSentByBenef = async (params, query) => {
  try {
    logger.info(`[${context}]: Getting report from db`);
    ObjLog.log(`[${context}]: Getting report from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    console.log("params: ", params);
    console.log("query: ", query);
    const resp = await poolSM.query(
      `SELECT * FROM report_amount_sent_by_benef(
                                                    ${
                                                      query.from_date === "null"
                                                        ? null
                                                        : parseInt(
                                                            query.from_date
                                                          )
                                                    },
                                                    ${
                                                      query.to_date === "null"
                                                        ? null
                                                        : parseInt(
                                                            query.to_date
                                                          )
                                                    },
                                                    ${
                                                      query.id_country ===
                                                      "null"
                                                        ? null
                                                        : parseInt(
                                                            query.id_country
                                                          )
                                                    },
                                                    ${
                                                      query.id_currency ===
                                                      "null"
                                                        ? null
                                                        : parseInt(
                                                            query.id_currency
                                                          )
                                                    },
                                                    ${
                                                      query.id_beneficiary ===
                                                      "null"
                                                        ? null
                                                        : parseInt(
                                                            query.id_beneficiary
                                                          )
                                                    },
                                                    '${params.email_user}'
                                                )`
    );
    return resp.rows[0].report_amount_sent_by_benef.report;
  } catch (error) {
    throw error;
  }
};

reportsPGRepository.reportAmountSentByCurrency = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting report from db`);
    ObjLog.log(`[${context}]: Getting report from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM report_amount_sent_by_currency(
                                                    '${email_user}'
                                                )`
    );
    return resp.rows[0].report_amount_sent_by_currency.report;
  } catch (error) {
    throw error;
  }
};

reportsPGRepository.reportTopFrequentBeneficiaries = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting report from db`);
    ObjLog.log(`[${context}]: Getting report from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM report_top_frequent_beneficiaries(
                                                    '${email_user}'
                                                )`
    );
    return resp.rows[0].report_top_frequent_beneficiaries.report;
  } catch (error) {
    throw error;
  }
};

reportsPGRepository.reportTopFrequentDestinations = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting report from db`);
    ObjLog.log(`[${context}]: Getting report from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM report_top_frequent_destinations(
                                                    '${email_user}'
                                                )`
    );
    return resp.rows[0].report_top_frequent_destinations.report;
  } catch (error) {
    throw error;
  }
};

reportsPGRepository.reportRemittancesByStatus = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting report from db`);
    ObjLog.log(`[${context}]: Getting report from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM report_remittances_by_status(
                                                    '${email_user}'
                                                )`
    );
    return resp.rows[0].report_remittances_by_status.report;
  } catch (error) {
    throw error;
  }
};

reportsPGRepository.reportRemittancesByMonth = async (email_user, month) => {
  try {
    logger.info(`[${context}]: Getting report from db`);
    ObjLog.log(`[${context}]: Getting report from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM report_remittances_by_month(
                                                    '${email_user}',
                                                    ${
                                                      month === "null"
                                                        ? null
                                                        : parseInt(month)
                                                    }
                                                )`
    );
    return resp.rows[0].report_remittances_by_month.report;
  } catch (error) {
    throw error;
  }
};

reportsPGRepository.reportRatesTakenAdvantageOf = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting report from db`);
    ObjLog.log(`[${context}]: Getting report from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM report_rates_taken_advantage(
                                                    '${email_user}'
                                                )`
    );
    return resp.rows[0].report_rates_taken_advantage.report;
  } catch (error) {
    throw error;
  }
};

reportsPGRepository.wholesalePartnersReports = async (slug) => {
  try {
    logger.info(`[${context}]: Getting report from db`);
    ObjLog.log(`[${context}]: Getting report from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM wholesale_partner_reports(
                                                    '${slug}'
                                                )`
    );
    return resp.rows[0].wholesale_partner_reports.report;
  } catch (error) {
    throw error;
  }
};

export default reportsPGRepository;
