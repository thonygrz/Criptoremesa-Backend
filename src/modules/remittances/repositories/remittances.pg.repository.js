import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const remittancesPGRepository = {};
const context = "remittances PG Repository";

remittancesPGRepository.notificationTypes = async () => {
  try {
    logger.info(`[${context}]: Looking for notification types on db`);
    ObjLog.log(`[${context}]: Looking for notification types on db`);
    await poolSM.query("SET SCHEMA 'msg_app'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_ms_user_notification_types()`
    );
    if (resp.rows) return resp.rows;
    else return null;
  } catch (error) {
    throw error;
  }
};

remittancesPGRepository.getRemittances = async (emailUser) => {
  try {
    logger.info(`[${context}]: Getting user frequent beneficiaries from db`);
    ObjLog.log(`[${context}]: Getting user frequent beneficiaries from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_chat_remittance_get_by_email($$${emailUser}$$,'chat')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

remittancesPGRepository.limitationsByCodPub = async (cust_cr_cod_pub) => {
  try {
    logger.info(`[${context}]: Looking for limitations on db`);
    ObjLog.log(`[${context}]: Looking for limitations on db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM get_limitations_by_user('${cust_cr_cod_pub}')`
    );
    if (resp.rows[0].get_limitations_by_user)
      return resp.rows[0].get_limitations_by_user;
    else return null;
  } catch (error) {
    throw error;
  }
};

remittancesPGRepository.startRemittance = async (body) => {
  try {
    logger.info(`[${context}]: Starting remittance on db`);
    ObjLog.log(`[${context}]: Starting remittance on db`);
    await poolSM.query("SET SCHEMA 'msg_app'");
    console.log("REMITTANCE A PASAR A BD BODYYY: ", body);
    const resp = await poolSM.query(
      `SELECT * FROM sp_lnk_cr_remittances_init('${JSON.stringify(body)}')`
    );
    
    if (resp.rows[0].sp_lnk_cr_remittances_init) {
      await poolSM.query(
        `SELECT * FROM sec_cust.cryptomiles_assign(${resp.rows[0].sp_lnk_cr_remittances_init.id_remittance})`
      );
      return resp.rows[0].sp_lnk_cr_remittances_init;
    }
    else return null;
  } catch (error) {
    throw error;
  }
};

remittancesPGRepository.startPreRemittance = async (body) => {
  try {
    logger.info(`[${context}]: Starting pre remittance on db`);
    ObjLog.log(`[${context}]: Starting pre remittance on db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_store_pre_remittance('${JSON.stringify(body)}','${
        body.email_user
      }')`
    );
    if (resp.rows[0].sp_store_pre_remittance)
      return resp.rows[0].sp_store_pre_remittance;
    else return null;
  } catch (error) {
    throw error;
  }
};

remittancesPGRepository.expiredPreRemittance = async (id_pre_remittance) => {
  try {
    logger.info(`[${context}]: Expiring pre remittance on db`);
    ObjLog.log(`[${context}]: Expiring pre remittance on db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_expire_pre_remittance(${id_pre_remittance})`
    );
    if (resp.rows[0].sp_expire_pre_remittance)
      return resp.rows[0].sp_expire_pre_remittance;
    else return null;
  } catch (error) {
    throw error;
  }
};

remittancesPGRepository.getPreRemittanceByUser = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting pre remittance on db`);
    ObjLog.log(`[${context}]: Getting pre remittance on db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM get_pre_remittance_by_user('${email_user}')`
    );
    if (resp.rows[0].get_pre_remittance_by_user)
      return resp.rows[0].get_pre_remittance_by_user;
    else return null;
  } catch (error) {
    throw error;
  }
};

remittancesPGRepository.cancelPreRemittance = async (id_pre_remittance) => {
  try {
    logger.info(`[${context}]: Getting pre remittance on db`);
    ObjLog.log(`[${context}]: Getting pre remittance on db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_cancel_pre_remittance(${id_pre_remittance})`
    );
    if (resp.rows[0].sp_cancel_pre_remittance)
      return resp.rows[0].sp_cancel_pre_remittance;
    else return null;
  } catch (error) {
    throw error;
  }
};

remittancesPGRepository.getBankFee = async (body) => {
  try {
    logger.info(`[${context}]: Getting fee from db`);
    ObjLog.log(`[${context}]: Getting fee from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_calculate_bank_fee(
                                          ${body.id_origin_bank},
                                          ${body.id_destiny_bank},
                                          ${body.id_pay_method}
                                          )`
    );
    console.log("resp: ", resp.rows);
    if (resp.rows[0].sp_calculate_bank_fee[0])
      return resp.rows[0].sp_calculate_bank_fee[0];
    else return null;
  } catch (error) {
    throw error;
  }
};

remittancesPGRepository.lastRemittances = async (email_user, limit, start_date, end_date) => {
  try {
    logger.info(`[${context}]: Getting last remittances on db`);
    ObjLog.log(`[${context}]: Getting last remittances on db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_get_last_remittances_by_user('${email_user}',
                                                      ${limit === 'null' ? null : limit},
                                                      ${start_date === 'null' ? null : start_date},
                                                      ${end_date === 'null' ? null : end_date}
                                                    )`
    );
    if (resp.rows[0].sp_get_last_remittances_by_user)
      return resp.rows[0].sp_get_last_remittances_by_user;
    else return null;
  } catch (error) {
    throw error;
  }
};

export default remittancesPGRepository;
