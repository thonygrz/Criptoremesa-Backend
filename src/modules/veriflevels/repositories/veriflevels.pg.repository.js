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
      '${body.resid_country}',
      '${body.migration_status}',
      '${body.new_resid_client_countries}',
      '${body.clients_number}',
      '${body.monthly_amount}',
      '${body.monetary_growth}',
      '${body.clients_growth}',
      '${body.bussiness_name}',
      '${body.web_page_exp}',
      '${body.logo}',
      '${body.email_user}',
      '${body.reasons_status}',
      '${body.strenghts_status}',
      '${body.remittance_service_status}',
      '${body.old_resid_client_countries_status}',
      '${body.profession_status}',
      '${body.resid_country_status}',
      '${body.migration_status_status}',
      '${body.new_resid_client_countries_status}',
      '${body.clients_number_status}',
      '${body.monthly_amount_status}',
      '${body.monetary_growth_status}',
      '${body.clients_growth_status}',
      '${body.bussiness_name_status}',
      '${body.web_page_exp_status}',
      '${body.logo_status}'
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

veriflevelsPGRepository.deactivateNotification = async (id_notification) => {
  try {
    logger.info(`[${context}]: Deactivating notification`);
    ObjLog.log(`[${context}]: Deactivating notification`);
    await pool.query("SET SCHEMA 'sec_cust'");
    console.log(id_notification)
    const resp = await pool.query(`SELECT * FROM sp_deactive_notification(
      ${id_notification}
    )`);
    return resp.rows[0].sp_deactive_notification;
  } catch (error) {
    throw error;
  }
};

veriflevelsPGRepository.readNotification = async (id_notification) => {
  try {
    logger.info(`[${context}]: Deactivating notification`);
    ObjLog.log(`[${context}]: Deactivating notification`);
    await pool.query("SET SCHEMA 'sec_cust'");
    console.log(id_notification)
    const resp = await pool.query(`SELECT * FROM sp_read_notification(
      ${id_notification}
    )`);
    return resp.rows[0].sp_read_notification;
  } catch (error) {
    throw error;
  }
};

veriflevelsPGRepository.getWholesalePartnerRequestsCountries = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting countries from DB`);
    ObjLog.log(`[${context}]: Getting countries from DB`);

    await pool.query("SET SCHEMA 'sec_cust'");
    console.log(email_user)
    const resp = await pool.query(`SELECT * FROM v_wholesale_partners_requests_countries()`);
    return resp.rows[0].v_wholesale_partners_requests_countries;
  } catch (error) {
    throw error;
  }
};

veriflevelsPGRepository.getMigrationStatus = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting migration status from DB`);
    ObjLog.log(`[${context}]: Getting migration status from DB`);

    await pool.query("SET SCHEMA 'sec_cust'");
    console.log(email_user)
    const resp = await pool.query(`SELECT * FROM v_migration_status()`);
    return resp.rows[0].v_migration_status;
  } catch (error) {
    throw error;
  }
};

veriflevelsPGRepository.getDisapprovedVerifLevelsRequirements = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting Disapproved VerifLevels Requirements from DB`);
    ObjLog.log(`[${context}]: Getting Disapproved VerifLevels Requirements from DB`);

    await pool.query("SET SCHEMA 'sec_cust'");
    console.log(email_user)
    const resp = await pool.query(`SELECT * FROM v_verif_levels_requirements_disapproved(${email_user})`);
    return resp.rows[0].v_verif_levels_requirements_disapproved;
  } catch (error) {
    throw error;
  }
};

veriflevelsPGRepository.getDisapprovedWholesalePartnersRequirements = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting Disapproved WholesalePartners Requirements from DB`);
    ObjLog.log(`[${context}]: Getting Disapproved WholesalePartners Requirements from DB`);

    await pool.query("SET SCHEMA 'sec_cust'");
    console.log(email_user)
    const resp = await pool.query(`SELECT * FROM v_wholesale_partners_requests_requirements_disapproved(${email_user})`);
    return resp.rows[0].v_wholesale_partners_requests_requirements_disapproved;
  } catch (error) {
    throw error;
  }
};

veriflevelsPGRepository.getLimitationsByCountry = async (id_country) => {
  try {
    logger.info(`[${context}]: Getting Limitations from DB`);
    ObjLog.log(`[${context}]: Getting Limitations from DB`);

    await pool.query("SET SCHEMA 'sec_cust'");
    console.log(id_country)
    const resp = await pool.query(`SELECT * FROM get_limitations_by_country(${id_country})`);
    return resp.rows[0].get_limitations_by_country;
  } catch (error) {
    throw error;
  }
};

veriflevelsPGRepository.getVerifLevelRequirements = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting requirements from DB`);
    ObjLog.log(`[${context}]: Getting requirements from DB`);

    await pool.query("SET SCHEMA 'sec_cust'");
    console.log(email_user)
    const resp = await pool.query(`SELECT * FROM v_verif_levels_requirements(${email_user})`);
    return resp.rows[0].v_verif_levels_requirements;
  } catch (error) {
    throw error;
  }
};

veriflevelsPGRepository.getWholesalePartnerRequestsRequirements = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting requirements from DB`);
    ObjLog.log(`[${context}]: Getting requirements from DB`);

    await pool.query("SET SCHEMA 'sec_cust'");
    console.log(email_user)
    const resp = await pool.query(`SELECT * FROM v_wholesale_partners_requests_requirements(${email_user})`);
    return resp.rows[0].v_wholesale_partners_requests_requirements;
  } catch (error) {
    throw error;
  }
};

veriflevelsPGRepository.validateRemittance = async (remittance) => {
  try {
    logger.info(`[${context}]: prooving from DB`);
    ObjLog.log(`[${context}]: prooving from DB`);

    await pool.query("SET SCHEMA 'sec_cust'");
    console.log('remittance',remittance)
    const resp = await pool.query(`SELECT * FROM validate_remittance('${JSON.stringify(remittance)}')`);
    return resp.rows[0].validate_remittance;
  } catch (error) {
    throw error;
  }
};

export default veriflevelsPGRepository;
