import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const usersPGRepository = {};
const context = "users PG Repository";

usersPGRepository.createUser = async (body) => {
  try {
    logger.info(`[${context}]: Inserting user in db`);
    ObjLog.log(`[${context}]: Inserting user in db`);

    await pool.query("SET SCHEMA 'sec_emp'");
    const resp =
      await pool.query(`SELECT * FROM sec_emp.SP_MS_SIXMAP_USERS_INSERT(
      '${body.first_name}',
      '${body.second_name}',
      '${body.last_name}',
      '${body.second_last_name}',
      '${body.username}',
      '${body.email_user}',
      '${body.password}',
      '${body.gender}',
      '${body.date_birth}',
      '${body.ident_doc_number}',
      '${body.main_phone}',
      '${body.main_phone_wha}',
      '${body.second_phone}',
      '${body.second_phone_wha}',
      '${body.delegated_phone}',
      '${body.delegated_phone_wha}',
      '${body.resid_city}',
      '${body.departments}',
      '${body.uuid_profile}',
      '${body.id_service}',
      '${body.id_services_utype}',
      '${body.id_ident_doc_type}', 
      '${body.id_resid_country}', 
      '${body.id_nationality_country}',
      '${body.main_phone_code}',
      '${body.main_phone_full}',
      '${body.second_phone_code}',
      '${body.second_phone_full}',
      '${body.delegated_phone_code}',
      '${body.delegated_phone_full}'
      );`);
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.createUserClient = async (body) => {
  try {
    logger.info(`[${context}]: Inserting user client in db`);
    ObjLog.log(`[${context}]: Inserting user client in db`);

    console.log("SE ENVIA A LA BD: ", body);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp =
      await pool.query(`SELECT * FROM sec_cust.SP_MS_SIXMAP_USERS_INSERT(
      '${body.first_name}',
      '${body.second_name}',
      '${body.last_name}',
      '${body.second_last_name}',
      '${body.username}',
      '${body.email_user}',
      '${body.password}',
      '${body.cod_user_serv_public}',
      '${body.cod_rank}',
      '${body.verif_level_apb}',
      '${body.multi_country}',
      '${body.gender}',
      '${body.date_birth}',
      '${body.ident_doc_number}',
      '${body.main_phone}',
      '${body.main_phone_wha}',
      '${body.second_phone}',
      '${body.second_phone_wha}',
      '${body.delegated_phone}',
      '${body.delegated_phone_wha}',
      '${body.resid_city}',
      '${body.address}',
      '${body.referral_node}',
      '${body.main_sn_platf}',
      '${body.user_main_sn_platf}',
      '${body.ok_legal_terms}',
      '${body.date_legacy_reg}',
      '${body.departments}',
      '${body.uuid_profile}',
      '${body.id_service}',
      '${body.id_services_utype}',
      '${body.id_ident_doc_type}', 
      '${body.id_resid_country}', 
      '${body.id_nationality_country}',
      '${body.id_verif_level}',
      '${body.main_phone_code}',
      '${body.main_phone_full}',
      '${body.second_phone_code}',
      '${body.second_phone_full}',
      '${body.delegated_phone_code}',
      '${body.delegated_phone_full}')
      ;`);
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.createNewClient = async (body) => {
  try {
    logger.info(`[${context}]: Inserting new client in db`);
    ObjLog.log(`[${context}]: Inserting new client in db`);

    console.log("SE ENVIA A LA BD: ", body);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp =
      await pool.query(`SELECT * FROM sec_cust.SP_MS_SIXMAP_USERS_INSERT_NEW(
      '${body.first_name}',
      '${body.second_name}',
      '${body.last_name}',
      '${body.second_last_name}',
      null,
      '${body.email_user}',
      '${body.password}',
      '${body.cod_user_serv_public}',
      '${body.cod_rank}',
      '${body.verif_level_apb}',
      '${body.multi_country}',
      '${body.gender}',
      null,
      null,
      '${body.main_phone}',
      '${body.main_phone_wha}',
      '${body.second_phone}',
      '${body.second_phone_wha}',
      '${body.delegated_phone}',
      '${body.delegated_phone_wha}',
      null,
      null,
      '${body.referral_node}',
      null,
      null,
      '${body.ok_legal_terms}',
      '${body.date_legacy_reg}',
      null,
      null,
      null,
      null,
      null, 
      '${body.id_resid_country}', 
      '${body.id_nationality_country}',
      null,
      '${body.main_phone_code}',
      '${body.main_phone_full}',
      '${body.second_phone_code}',
      '${body.second_phone_full}',
      '${body.delegated_phone_code}',
      '${body.delegated_phone_full}')
      ;`);
    console.log("resp: ", resp);
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getUsers = async () => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(`SELECT * FROM sp_ms_sixmap_users_get_all()`);
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getusersClient = async () => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(`SELECT * FROM sp_ms_sixmap_users_get_all()`);
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.updateUserClient = async (cols, vals, uuid) => {
  try {
    logger.info(`[${context}]: Updating user on db`);
    ObjLog.log(`[${context}]: Updating user on db`);
    console.log("COLS: ", cols);
    console.log("VALS: ", vals);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sp_ms_sixmap_users_update(
      ($1),
      ($2),
      ($3)
    )
    `,
      [cols, vals, uuid]
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.updateUserEmployee = async (cols, vals, uuid) => {
  try {
    logger.info(`[${context}]: Updating user on db`);
    ObjLog.log(`[${context}]: Updating user on db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM sp_ms_sixmap_users_update(
      ($1),
      ($2),
      ($3)
    )
    `,
      [cols, vals, uuid]
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.blockClient = async (uuid) => {
  try {
    logger.info(`[${context}]: Blocking user on db`);
    ObjLog.log(`[${context}]: Blocking user on db`);
    let cols = ["user_active", "user_blocked"];
    let vals = [false, true];
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sp_ms_sixmap_users_update(
      ($1),
      ($2),
      ($3)
    )
    `,
      [cols, vals, uuid]
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.blockEmployee = async (uuid) => {
  try {
    logger.info(`[${context}]: Blocking user on db`);
    ObjLog.log(`[${context}]: Blocking user on db`);
    let cols = ["user_active", "user_blocked"];
    let vals = [false, true];
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM sp_ms_sixmap_users_update(
      ($1),
      ($2),
      ($3)
    )
    `,
      [cols, vals, uuid]
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.unblockClient = async (uuid) => {
  try {
    logger.info(`[${context}]: unblocking user on db`);
    ObjLog.log(`[${context}]: unblocking user on db`);
    let cols = ["user_active", "user_blocked"];
    let vals = [true, false];
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sp_ms_sixmap_users_update(
      ($1),
      ($2),
      ($3)
    )
    `,
      [cols, vals, uuid]
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.unblockEmployee = async (uuid) => {
  try {
    logger.info(`[${context}]: unblocking user on db`);
    ObjLog.log(`[${context}]: unblocking user on db`);
    let cols = ["user_active", "user_blocked"];
    let vals = [true, false];
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM sp_ms_sixmap_users_update(
      ($1),
      ($2),
      ($3)
    )
    `,
      [cols, vals, uuid]
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getusersClientById = async (id) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(`SELECT * FROM get_user_by_id(${id})`);
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getusersEmployeeById = async (id) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(`SELECT * FROM get_user_by_id(${id})`);
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getEmployeePhonesById = async (id) => {
  try {
    logger.info(`[${context}]: Getting phones from db`);
    ObjLog.log(`[${context}]: Getting phones from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM get_phones_by_uuid_user(${id})`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getClientPhonesById = async (id) => {
  try {
    logger.info(`[${context}]: Getting phones from db`);
    ObjLog.log(`[${context}]: Getting phones from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM get_phones_by_uuid_user(${id})`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getDepartmentsByUserId = async (id) => {
  try {
    logger.info(`[${context}]: Getting departments from db`);
    ObjLog.log(`[${context}]: Getting departments from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM get_departments_by_uuid_user(${id})`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.approveLevelCero = async (id) => {
  try {
    logger.info(`[${context}]: Approving level cero on db`);
    ObjLog.log(`[${context}]: Approving level cero on db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(`SELECT * FROM SP_APPROVE_LEVEL_CERO(${id})`);
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getUUIDProfileByNameEmployee = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM get_uuid_profile_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].uuid_profile;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getUUIDProfileByNameClient = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sec_cust.get_uuid_profile_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].uuid_profile;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdServiceByNameClient = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM get_id_service_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].id_service;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdServiceByNameEmployee = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM get_id_service_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].id_service;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdUTypeByNameClient = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM get_id_utype_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].id_services_utype;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdUTypeByNameEmployee = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM get_id_utype_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].id_services_utype;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdDocTypeByNameClient = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM get_id_doc_type_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].id_ident_doc_type;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdDocTypeByNameEmployee = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM get_id_doc_type_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].id_ident_doc_type;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdResidCountryByNameClient = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM get_id_resid_country_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].id_country;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdResidCountryByNameEmployee = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM get_id_resid_country_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].id_country;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdNatCountryByNameClient = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM get_id_ip_country_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].id_ip_country;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdNatCountryByNameEmployee = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM get_id_ip_country_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].id_ip_country;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdVerifLevelByNameClient = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM get_id_verif_level_by_name(${name})`
    );
    if (resp.rows[0]) return resp.rows[0].id_verif_level;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdDepartmentByNameClient = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM get_id_department_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].id_dpt;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.getIdDepartmentByNameEmployee = async (name) => {
  try {
    logger.info(`[${context}]: Getting users from db`);
    ObjLog.log(`[${context}]: Getting users from db`);
    await pool.query("SET SCHEMA 'sec_emp'");
    const resp = await pool.query(
      `SELECT * FROM get_id_department_by_name('${name}')`
    );
    if (resp.rows[0]) return resp.rows[0].id_dpt;
    else return null;
  } catch (error) {
    throw error;
  }
};

usersPGRepository.requestLevelOne = async (body) => {
  try {
    logger.info(`[${context}]: Requesting level one in db`);
    ObjLog.log(`[${context}]: Requesting level one in db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM SP_REQUEST_LEVEL_ONE(
        '${body.date_birth}',
        '${body.state_name}',
        '${body.resid_city}',
        '${body.pol_exp_per}',
        '${body.uuid_user}',
        '${body.name_country}',
        '${body.ident_doc_number}',
        '${body.occupation}',
        '${body.doc_path}',
        '${body.selfie_path}'
        )`
    );
    if (resp.rows[0]) return resp.rows[0];
    else return null;
  } catch (error) {
    throw error;
  }
};

export default usersPGRepository;
