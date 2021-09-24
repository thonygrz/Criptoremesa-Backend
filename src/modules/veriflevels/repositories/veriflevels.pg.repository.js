import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const veriflevelsPGRepository = {};
const context = "veriflevels PG Repository";

veriflevelsPGRepository.getveriflevels = async (body) => {
  try {
    logger.info(`[${context}]: Getting veriflevels from db`);
    ObjLog.log(`[${context}]: Getting veriflevels from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sec_cust.v_ms_verif_level_get_id_vl_by_service_utype_country(${body.id_service}::BIGINT,${body.id_services_utype}::BIGINT,${body.id_resid_country}::BIGINT)`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

veriflevelsPGRepository.requestWholesalePartner = async (body) => {
  try {
    logger.info(`[${context}]: Requesting Wholesale Partner in db`);
    ObjLog.log(`[${context}]: Requesting Wholesale Partner in db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(`SELECT * FROM SP_REQUEST_WHOLESALE_PARTNER(
      '${body.reasons}',
      '${body.strenghts}',
      '${body.remittance_service}',
      '${body.old_resid_client_countries}',
      '${body.profession}',
      '${body.resid_country_and_migration_status}',
      '${body.new_resid_client_countries}',
      '${body.clients_number}',
      '${body.monthly_amount}',
      '${body.monetary_growth}',
      '${body.clients_growth}',
      '${body.bussiness_name}',
      '${body.web_page_exp}',
      '${body.logo}',
      '${body.email_user}'
    )`);
    return resp.rows[0].sp_request_wholesale_partner;
  } catch (error) {
    throw error;
  }
};

veriflevelsPGRepository.notifications = async (email_user) => {
  try {
    logger.info(`[${context}]: Requesting notifications`);
    ObjLog.log(`[${context}]: Requesting notifications`);
    await pool.query("SET SCHEMA 'sec_cust'");
    console.log(email_user)
    const resp = await pool.query(`SELECT * FROM v_notifications(
      ${email_user}
    )`);
    return resp.rows[0].v_notifications;
  } catch (error) {
    throw error;
  }
};

export default veriflevelsPGRepository;
