import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const beneficiariesPGRepository = {};
const context = "beneficiaries PG Repository";

beneficiariesPGRepository.getUserFrequentBeneficiaries = async (emailUser) => {
  try {
    logger.info(`[${context}]: Getting user frequent beneficiaries from db`);
    ObjLog.log(`[${context}]: Getting user frequent beneficiaries from db`);
    await pool.query("SET SCHEMA 'prc_mng'");
    const resp = await pool.query(
      `SELECT * FROM prc_mng.get_all_frequents_beneficiaries('${emailUser}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

beneficiariesPGRepository.createFrequentBeneficiary = async (body,emailUser) => {
  try {
    logger.info(`[${context}]: Inserting ${emailUser} new frequent beneficiary to db`);
    ObjLog.log(`[${context}]: Inserting ${emailUser} new frequent beneficiary to db`);
    await pool.query("SET SCHEMA 'prc_mng'");
    const resp = await pool.query(
      `SELECT * FROM prc_mng.insert_frequents_beneficiaries(
        '${body.nickname}',
        '${body.owner_name}',
        '${body.identification}',
        ${body.account === null ? 'null' : `'${body.account}'`},
        ${body.account_type === null ? 'null' : `'${body.account_type}'`},
        ${body.phone_number === null ? 'null' : `'${body.phone_number}'`},
        ${body.email === null ? 'null' : `'${body.email}'`},
        '${body.id_bank}',
        '${emailUser}',
        '${body.id_pay_method}'
        )`
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
};

beneficiariesPGRepository.deleteFrequentBeneficiary = async (emailUser) => {
  try {
    logger.info(`[${context}]: Deleting user frequent beneficiary from DB`);
    ObjLog.log(`[${context}]: Deleting user frequent beneficiary from DB`);
    await pool.query("SET SCHEMA 'prc_mng'");
    const resp = await pool.query(
      `SELECT * FROM prc_mng.FUNCION('${emailUser}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

beneficiariesPGRepository.updateFrequentBeneficiary = async (emailUser) => {
  try {
    logger.info(`[${context}]: Updating user frequent beneficiary in DB`);
    ObjLog.log(`[${context}]: Updating user frequent beneficiary in DB`);
    await pool.query("SET SCHEMA 'prc_mng'");
    const resp = await pool.query(
      `SELECT * FROM prc_mng.FUNCION('${emailUser}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

export default beneficiariesPGRepository;
