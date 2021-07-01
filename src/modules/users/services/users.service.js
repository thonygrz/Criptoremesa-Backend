import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import usersPGRepository from "../repositories/users.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import auth from "../../../utils/auth";
import bcrypt from "bcryptjs";
// import { table } from "../../../utils/googleSpreadSheets";

const usersService = {};
const context = "users Service";

function addStatusToItems(data) {
  data = data.map(function (d) {
    if (d.user_active) {
      return {
        id_uuid: d.id_uuid,
        first_name: d.first_name,
        second_name: d.second_name,
        last_name: d.last_name,
        second_last_name: d.second_last_name,
        username: d.username,
        email_user: d.email_user,
        last_session_reg: d.last_session_reg,
        last_ip_reg: d.last_ip_reg,
        last_ip_city_reg: d.last_ip_city_reg,
        last_id_log_reg: d.last_id_log_reg,
        date_last_conn: d.date_last_conn,
        gender: d.gender,
        date_birth: d.date_birth,
        ident_doc_number: d.ident_doc_number,
        main_phone: d.main_phone,
        second_phone: d.second_phone,
        delegated_phone: d.delegated_phone,
        resid_city: d.resid_city,
        user_active: d.user_active,
        user_blocked: d.user_blocked,
        uuid_profile: d.uuid_profile,
        id_service: d.id_service,
        id_services_utype: d.id_services_utype,
        id_ident_doc_type: d.id_ident_doc_type,
        id_resid_country: d.id_resid_country,
        id_nationality_country: d.id_nationality_country,
        name_profile: d.name_profile,
        name_service: d.name_service,
        name_services_utype: d.name_services_utype,
        name_ident_doc_type: d.name_ident_doc_type,
        name_resid_country: d.name_resid_country,
        name_nationality_country: d.name_nationality_country,
        status: "Activo",
      };
    } else {
      return {
        id_uuid: d.id_uuid,
        first_name: d.first_name,
        second_name: d.second_name,
        last_name: d.last_name,
        second_last_name: d.second_last_name,
        username: d.username,
        email_user: d.email_user,
        last_session_reg: d.last_session_reg,
        last_ip_reg: d.last_ip_reg,
        last_ip_city_reg: d.last_ip_city_reg,
        last_id_log_reg: d.last_id_log_reg,
        date_last_conn: d.date_last_conn,
        gender: d.gender,
        date_birth: d.date_birth,
        ident_doc_number: d.ident_doc_number,
        main_phone: d.main_phone,
        second_phone: d.second_phone,
        delegated_phone: d.delegated_phone,
        resid_city: d.resid_city,
        user_active: d.user_active,
        user_blocked: d.user_blocked,
        uuid_profile: d.uuid_profile,
        id_service: d.id_service,
        id_services_utype: d.id_services_utype,
        id_ident_doc_type: d.id_ident_doc_type,
        id_resid_country: d.id_resid_country,
        id_nationality_country: d.id_nationality_country,
        name_profile: d.name_profile,
        name_service: d.name_service,
        name_services_utype: d.name_services_utype,
        name_ident_doc_type: d.name_ident_doc_type,
        name_resid_country: d.name_resid_country,
        name_nationality_country: d.name_nationality_country,
        status: "Inactivo",
      };
    }
  });
  return data;
}

function addStatusToItemsClients(data) {
  data = data.map(function (d) {
    if (d.user_active) {
      return {
        id_uuid: d.id_uuid,
        first_name: d.first_name,
        second_name: d.second_name,
        last_name: d.last_name,
        second_last_name: d.second_last_name,
        username: d.username,
        email_user: d.email_user,
        last_session_reg: d.last_session_reg,
        last_ip_reg: d.last_ip_reg,
        last_ip_city_reg: d.last_ip_city_reg,
        last_id_log_reg: d.last_id_log_reg,
        date_last_conn: d.date_last_conn,
        gender: d.gender,
        date_birth: d.date_birth,
        ident_doc_number: d.ident_doc_number,
        main_phone: d.main_phone,
        second_phone: d.second_phone,
        delegated_phone: d.delegated_phone,
        resid_city: d.resid_city,
        user_active: d.user_active,
        user_blocked: d.user_blocked,
        uuid_profile: d.uuid_profile,
        id_service: d.id_service,
        id_services_utype: d.id_services_utype,
        id_ident_doc_type: d.id_ident_doc_type,
        id_resid_country: d.id_resid_country,
        id_nationality_country: d.id_nationality_country,
        name_profile: d.name_profile,
        name_service: d.name_service,
        name_services_utype: d.name_services_utype,
        name_ident_doc_type: d.name_ident_doc_type,
        name_resid_country: d.name_resid_country,
        name_nationality_country: d.name_nationality_country,
        address: d.address,
        cod_user_serv_public: d.cod_user_serv_public,
        cod_rank: d.cod_rank,
        referral_node: d.referral_node,
        main_sn_platf: d.main_sn_platf,
        user_main_sn_platf: d.user_main_sn_platf,
        date_legacy_reg: d.date_legacy_reg,
        status: "Activo",
      };
    } else {
      return {
        id_uuid: d.id_uuid,
        first_name: d.first_name,
        second_name: d.second_name,
        last_name: d.last_name,
        second_last_name: d.second_last_name,
        username: d.username,
        email_user: d.email_user,
        last_session_reg: d.last_session_reg,
        last_ip_reg: d.last_ip_reg,
        last_ip_city_reg: d.last_ip_city_reg,
        last_id_log_reg: d.last_id_log_reg,
        date_last_conn: d.date_last_conn,
        gender: d.gender,
        date_birth: d.date_birth,
        ident_doc_number: d.ident_doc_number,
        main_phone: d.main_phone,
        second_phone: d.second_phone,
        delegated_phone: d.delegated_phone,
        resid_city: d.resid_city,
        user_active: d.user_active,
        user_blocked: d.user_blocked,
        uuid_profile: d.uuid_profile,
        id_service: d.id_service,
        id_services_utype: d.id_services_utype,
        id_ident_doc_type: d.id_ident_doc_type,
        id_resid_country: d.id_resid_country,
        id_nationality_country: d.id_nationality_country,
        name_profile: d.name_profile,
        name_service: d.name_service,
        name_services_utype: d.name_services_utype,
        name_ident_doc_type: d.name_ident_doc_type,
        name_resid_country: d.name_resid_country,
        name_nationality_country: d.name_nationality_country,
        address: d.address,
        cod_user_serv_public: d.cod_user_serv_public,
        cod_rank: d.cod_rank,
        referral_node: d.referral_node,
        main_sn_platf: d.main_sn_platf,
        user_main_sn_platf: d.user_main_sn_platf,
        date_legacy_reg: d.date_legacy_reg,
        status: "Inactivo",
      };
    }
  });
  return data;
}

usersService.getusers = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await usersPGRepository.getUsers();

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/getActive",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    /////////////////////////////
    //transformation for frontend
    /////////////////////////////

    let feObj = {
      fields: {
        name: "Vista Original",
        headerPrimary: [
          {
            name: "Datos Personales",
            key: "datos_personales",
            children: [
              {
                key: "first_name",
              },
              {
                key: "second_name",
              },
              {
                key: "last_name",
              },
              {
                key: "second_last_name",
              },
              {
                key: "username",
              },
              {
                key: "email_user",
              },
              {
                key: "gender",
              },
              {
                key: "date_birth",
              },
              {
                key: "name_ident_doc_type",
              },
              {
                key: "ident_doc_number",
              },
              {
                key: "main_phone",
              },
              {
                key: "second_phone",
              },
              {
                key: "delegated_phone",
              },
              {
                key: "resid_city",
              },
              {
                key: "name_resid_country",
              },
              {
                key: "name_nationality_country",
              },
            ],
          },
          {
            name: "Datos Administrativos",
            key: "datos_administrativos",
            children: [
              {
                key: "name_profile",
              },
              {
                key: "name_service",
              },
              {
                key: "name_services_utype",
              },
            ],
          },
          {
            name: "Auditoría",
            key: "auditoria",
            children: [
              {
                key: "last_ip_reg",
              },
              {
                key: "last_ip_city_reg",
              },
              {
                key: "date_last_conn",
              },
              {
                key: "status",
              },
            ],
          },
        ],
        headerSecondary: [
          {
            name: "Primer Nombre",
            key: "first_name",
            parent: "datos_personales",
          },
          {
            name: "Segundo Nombre",
            key: "second_name",
            parent: "datos_personales",
          },
          {
            name: "Apellido",
            key: "last_name",
            parent: "datos_personales",
          },
          {
            name: "Segundo Apellido",
            key: "second_last_name",
            parent: "datos_personales",
          },
          {
            name: "Nombre de Usuario",
            key: "username",
            parent: "datos_personales",
          },
          {
            name: "Correo electrónico",
            key: "email_user",
            parent: "datos_personales",
          },
          {
            name: "Género",
            key: "gender",
            parent: "datos_personales",
          },
          {
            name: "Fecha de Nacimiento",
            key: "date_birth",
            parent: "datos_personales",
          },
          {
            name: "Tipo de Identificación",
            key: "name_ident_doc_type",
            parent: "datos_personales",
          },
          {
            name: "Número de Identificación",
            key: "ident_doc_number",
            parent: "datos_personales",
          },
          {
            name: "Teléfono",
            key: "main_phone",
            parent: "datos_personales",
          },
          {
            name: "Segundo Teléfono",
            key: "second_phone",
            parent: "datos_personales",
          },
          {
            name: "Teléfono delegado",
            key: "delegated_phone",
            parent: "datos_personales",
          },
          {
            name: "Ciudad de Residencia",
            key: "resid_city",
            parent: "datos_personales",
          },
          {
            name: "País de Residencia",
            key: "name_resid_country",
            parent: "datos_personales",
          },
          {
            name: "País de Nacimiento",
            key: "name_nationality_country",
            parent: "datos_personales",
          },
          {
            name: "Perfil",
            key: "name_profile",
            parent: "datos_administrativos",
          },
          {
            name: "Servicio",
            key: "name_service",
            parent: "datos_administrativos",
          },
          {
            name: "Tipo de Usuario",
            key: "name_services_utype",
            parent: "datos_administrativos",
          },
          {
            name: "Última IP",
            key: "last_ip_reg",
            parent: "auditoria",
          },
          {
            name: "Última Ciudad",
            key: "last_ip_city_reg",
            parent: "auditoria",
          },
          {
            name: "Última Conexión",
            key: "date_last_conn",
            parent: "auditoria",
          },
          {
            name: "Estatus",
            key: "status",
            parent: "auditoria",
          },
        ],
      },
      views: [],
      items: addStatusToItems(data),
      standarts: [
        {
          key: "status",
          colors: {
            Activo: 3,
            Inactivo: 1,
          },
        },
      ],
    };

    res.status(200).json(feObj);
  } catch (error) {
    next(error);
  }
};

usersService.getusersClient = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await usersPGRepository.getusersClient();
    console.log("CLIENTS A ENVIAR: ", data);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/getActive",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    /////////////////////////////
    //transformation for frontend
    /////////////////////////////

    let feObj = {
      fields: {
        name: "Vista Original",
        headerPrimary: [
          {
            name: "Datos Personales",
            key: "datos_personales",
            children: [
              {
                key: "first_name",
              },
              {
                key: "second_name",
              },
              {
                key: "last_name",
              },
              {
                key: "second_last_name",
              },
              {
                key: "username",
              },
              {
                key: "email_user",
              },
              {
                key: "gender",
              },
              {
                key: "date_birth",
              },
              {
                key: "name_ident_doc_type",
              },
              {
                key: "ident_doc_number",
              },
              {
                key: "main_phone",
              },
              {
                key: "second_phone",
              },
              {
                key: "delegated_phone",
              },
              {
                key: "address",
              },
              {
                key: "resid_city",
              },
              {
                key: "name_resid_country",
              },
              {
                key: "name_nationality_country",
              },
              {
                key: "referral_node",
              },
              {
                key: "main_sn_platf",
              },
              {
                key: "user_main_sn_platf",
              },
            ],
          },
          {
            name: "Datos Administrativos",
            key: "datos_administrativos",
            children: [
              {
                key: "date_legacy_reg",
              },
              {
                key: "name_profile",
              },
              {
                key: "name_service",
              },
              {
                key: "name_services_utype",
              },
              {
                key: "cod_user_serv_public",
              },
              {
                key: "cod_rank",
              },
            ],
          },
          {
            name: "Auditoría",
            key: "auditoria",
            children: [
              {
                key: "last_ip_reg",
              },
              {
                key: "last_ip_city_reg",
              },
              {
                key: "date_last_conn",
              },
              {
                key: "status",
              },
            ],
          },
        ],
        headerSecondary: [
          {
            name: "Primer Nombre",
            key: "first_name",
            parent: "datos_personales",
          },
          {
            name: "Segundo Nombre",
            key: "second_name",
            parent: "datos_personales",
          },
          {
            name: "Apellido",
            key: "last_name",
            parent: "datos_personales",
          },
          {
            name: "Segundo Apellido",
            key: "second_last_name",
            parent: "datos_personales",
          },
          {
            name: "Nombre de Usuario",
            key: "username",
            parent: "datos_personales",
          },
          {
            name: "Correo electrónico",
            key: "email_user",
            parent: "datos_personales",
          },
          {
            name: "Género",
            key: "gender",
            parent: "datos_personales",
          },
          {
            name: "Fecha de Nacimiento",
            key: "date_birth",
            parent: "datos_personales",
          },
          {
            name: "Tipo de Identificación",
            key: "name_ident_doc_type",
            parent: "datos_personales",
          },
          {
            name: "Número de Identificación",
            key: "ident_doc_number",
            parent: "datos_personales",
          },
          {
            name: "Teléfono",
            key: "main_phone",
            parent: "datos_personales",
          },
          {
            name: "Segundo Teléfono",
            key: "second_phone",
            parent: "datos_personales",
          },
          {
            name: "Teléfono delegado",
            key: "delegated_phone",
            parent: "datos_personales",
          },
          {
            name: "Dirección",
            key: "address",
            parent: "datos_personales",
          },
          {
            name: "Ciudad de Residencia",
            key: "resid_city",
            parent: "datos_personales",
          },
          {
            name: "País de Residencia",
            key: "name_resid_country",
            parent: "datos_personales",
          },
          {
            name: "País de Nacimiento",
            key: "name_nationality_country",
            parent: "datos_personales",
          },
          {
            name: "Se enteró por",
            key: "referral_node",
            parent: "datos_personales",
          },
          {
            name: "Plataforma principal",
            key: "main_sn_platf",
            parent: "datos_personales",
          },
          {
            name: "Usuario en plataforma principal",
            key: "user_main_sn_platf",
            parent: "datos_personales",
          },
          {
            name: "Fecha de entrada a la compañía",
            key: "date_legacy_reg",
            parent: "datos_administrativos",
          },
          {
            name: "Perfil",
            key: "name_profile",
            parent: "datos_administrativos",
          },
          {
            name: "Servicio",
            key: "name_service",
            parent: "datos_administrativos",
          },
          {
            name: "Tipo de Usuario",
            key: "name_services_utype",
            parent: "datos_administrativos",
          },
          {
            name: "Código público",
            key: "cod_user_serv_public",
            parent: "datos_administrativos",
          },
          {
            name: "COD RANK",
            key: "cod_rank",
            parent: "datos_administrativos",
          },
          {
            name: "Última IP",
            key: "last_ip_reg",
            parent: "auditoria",
          },
          {
            name: "Última Ciudad",
            key: "last_ip_city_reg",
            parent: "auditoria",
          },
          {
            name: "Última Conexión",
            key: "date_last_conn",
            parent: "auditoria",
          },
          {
            name: "Estatus",
            key: "status",
            parent: "auditoria",
          },
        ],
      },
      views: [],
      items: addStatusToItemsClients(data),
      standarts: [
        {
          key: "status",
          colors: {
            Activo: 3,
            Inactivo: 1,
          },
        },
      ],
    };

    res.status(200).json(feObj);
  } catch (error) {
    next(error);
  }
};

usersService.createUser = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    let password = await bcrypt.hash(req.body.password, 10);
    let userObj = {
      first_name: req.body.first_name,
      second_name: req.body.second_name,
      last_name: req.body.last_name,
      second_last_name: req.body.second_last_name,
      username: req.body.username,
      email_user: req.body.email_user,
      password,
      gender: req.body.gender,
      date_birth: req.body.date_birth,
      ident_doc_number: req.body.ident_doc_number,
      main_phone: req.body.main_phone,
      main_phone_wha: req.body.main_phone_wha,
      second_phone: req.body.second_phone,
      second_phone_wha: req.body.second_phone_wha,
      delegated_phone: req.body.delegated_phone,
      delegated_phone_wha: req.body.delegated_phone_wha,
      resid_city: req.body.resid_city,
      departments: req.body.departments,
      uuid_profile: req.body.uuid_profile,
      id_service: req.body.id_service,
      id_services_utype: req.body.id_services_utype,
      id_ident_doc_type: req.body.id_ident_doc_type,
      id_resid_country: req.body.id_resid_country,
      id_nationality_country: req.body.id_nationality_country,
      last_ip_registred: req.clientIp,
      main_phone_code: req.body.main_phone_code,
      main_phone_full: req.body.main_phone_full,
      second_phone_code: req.body.second_phone_code,
      second_phone_full: req.body.second_phone_full,
      delegated_phone_code: req.body.delegated_phone_code,
      delegated_phone_full: req.body.delegated_phone_full,
    };
    await usersPGRepository.createUser(userObj);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/create",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json({ message: "User registred succesfully" });
  } catch (error) {
    next(error);
  }
};

usersService.createUserClient = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    let password = await bcrypt.hash(req.body.password, 10);
    let userObj = {
      first_name: req.body.first_name,
      second_name: req.body.second_name,
      last_name: req.body.last_name,
      second_last_name: req.body.second_last_name,
      username: req.body.username,
      email_user: req.body.email_user,
      password,
      cod_user_serv_public: req.body.cod_user_serv_public,
      cod_rank: req.body.cod_rank,
      register_ini_apb: req.body.register_ini_apb,
      multi_country: req.body.multi_country,
      gender: req.body.gender,
      date_birth: req.body.date_birth,
      ident_doc_number: req.body.ident_doc_number,
      main_phone: req.body.main_phone,
      main_phone_wha: req.body.main_phone_wha,
      second_phone: req.body.second_phone,
      second_phone_wha: req.body.second_phone_wha,
      delegated_phone: req.body.delegated_phone,
      delegated_phone_wha: req.body.delegated_phone_wha,
      resid_city: req.body.resid_city,
      address: req.body.address,
      referral_node: req.body.referral_node,
      main_sn_platf: req.body.main_sn_platf,
      user_main_sn_platf: req.body.user_main_sn_platf,
      ok_legal_terms: req.body.ok_legal_terms,
      date_legacy_reg: req.body.date_legacy_reg,
      departments: req.body.departments,
      uuid_profile: req.body.uuid_profile,
      id_service: req.body.id_service,
      id_services_utype: req.body.id_services_utype,
      id_ident_doc_type: req.body.id_ident_doc_type,
      id_resid_country: req.body.id_resid_country,
      id_nationality_country: req.body.id_nationality_country,
      last_ip_registred: req.clientIp,
      id_verif_level: req.body.id_verif_level,
      main_phone_code: req.body.main_phone_code,
      main_phone_full: req.body.main_phone_full,
      second_phone_code: req.body.second_phone_code,
      second_phone_full: req.body.second_phone_full,
      delegated_phone_code: req.body.delegated_phone_code,
      delegated_phone_full: req.body.delegated_phone_full,
    };
    await usersPGRepository.createUserClient(userObj);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/createClient",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json({ message: "User registred succesfully" });
  } catch (error) {
    next(error);
  }
};

usersService.updateUserClient = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    if (req.body.valsArray[24])
      req.body.valsArray[24] = await bcrypt.hash(req.body.valsArray[24], 10);

    await usersPGRepository.updateUserClient(
      req.body.colsArray,
      req.body.valsArray,
      req.body.uuid_user
    );

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/updateClient",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json({ message: "User updated succesfully" });
  } catch (error) {
    next(error);
  }
};

usersService.updateUserEmployee = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    if (req.body.valsArray[15])
      req.body.valsArray[15] = await bcrypt.hash(req.body.valsArray[15], 10);

    await usersPGRepository.updateUserEmployee(
      req.body.colsArray,
      req.body.valsArray,
      req.body.uuid_user
    );

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/updateEmployee",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json({ message: "User updated succesfully" });
  } catch (error) {
    next(error);
  }
};

usersService.getusersClientById = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    let data = await usersPGRepository.getusersClientById(req.params.id);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/geClientById",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(data[0]);
  } catch (error) {
    next(error);
  }
};

usersService.getusersEmployeeById = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    let data = await usersPGRepository.getusersEmployeeById(req.params.id);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/geEmployeeById",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(data[0]);
  } catch (error) {
    next(error);
  }
};

usersService.getEmployeePhonesById = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    let data = await usersPGRepository.getEmployeePhonesById(req.params.id);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/getEmployeePhonesById",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

usersService.getClientPhonesById = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    let data = await usersPGRepository.getClientPhonesById(req.params.id);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/getClientPhonesById",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

usersService.getDepartmentsByUserId = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    let data = await usersPGRepository.getDepartmentsByUserId(req.params.id);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/getDepartmentsByUserId",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/////////////////////
//ETL TRANSFORMATIONS
/////////////////////

function extractFirstName(names) {
  if (names) {
    let arr = names.split("  ");
    return arr[0];
  }
  return null;
}

function extractSecondName(names) {
  if (names) {
    let arr = names.split("  ");
    return arr[1];
  }
  return null;
}

function extractLastName(lastNames) {
  if (lastNames) {
    let arr = lastNames.split("  ");
    return arr[0];
  }
  return null;
}

function extractSecondLastName(lastNames) {
  if (lastNames) {
    let arr = lastNames.split("  ");
    return arr[1];
  }
  return null;
}

function extractUsername(email) {
  if (email) {
    let arr = email.split("@");
    return arr[0];
  }
  return null;
}

function okLegalTermsBool(ok) {
  if (ok && ok === "Si") return true;
  return false;
}
// prettier-ignore
let arrDep = []

function setarrDep(val) {
  arrDep.push(val);
}

function getarrDep() {
  return arrDep;
}

async function getDepartmentsClient(departments) {
  if (departments) {
    departments = departments.split(" / ");

    let arrD = [];

    for (const dep of departments) {
      let id = await usersPGRepository.getIdDepartmentByNameClient(dep);
      arrD.push(id);
    }

    return "{" + arrD + "}";
  }
  return null;
}

async function getDepartmentsEmployee(departments) {
  if (departments) {
    departments = departments.split(" / ");

    let arrD = [];

    for (const dep of departments) {
      let id = await usersPGRepository.getIdDepartmentByNameEmployee(dep);
      arrD.push(id);
    }

    return "{" + arrD + "}";
  }
  return null;
}

async function getUUIDProfileClient(name) {
  let uuid = await usersPGRepository.getUUIDProfileByNameClient(name);
  return uuid;
}

async function getUUIDProfileEmployee(name) {
  let uuid = await usersPGRepository.getUUIDProfileByNameEmployee(name);
  return uuid;
}

async function getIdServiceClient(name) {
  let uuid = await usersPGRepository.getIdServiceByNameClient(name);
  return uuid;
}

async function getIdServiceEmployee(name) {
  let uuid = await usersPGRepository.getIdServiceByNameEmployee(name);
  return uuid;
}

async function getIdUTypeClient(name) {
  let uuid = await usersPGRepository.getIdUTypeByNameClient(name);
  return uuid;
}

async function getIdUTypeEmployee(name) {
  let uuid = await usersPGRepository.getIdUTypeByNameEmployee(name);
  return uuid;
}

async function getIdDocTypeClient(name) {
  let uuid = await usersPGRepository.getIdDocTypeByNameClient(name);
  return uuid;
}

async function getIdDocTypeEmployee(name) {
  let uuid = await usersPGRepository.getIdDocTypeByNameEmployee(name);
  return uuid;
}

async function getIdResidCountryClient(name) {
  let uuid = await usersPGRepository.getIdResidCountryByNameClient(name);
  return uuid;
}

async function getIdResidCountryEmployee(name) {
  let uuid = await usersPGRepository.getIdResidCountryByNameEmployee(name);
  return uuid;
}

async function getIdNatCountryClient(name) {
  let uuid = await usersPGRepository.getIdNatCountryByNameClient(name);
  return uuid;
}

async function getIdNatCountryEmployee(name) {
  let uuid = await usersPGRepository.getIdNatCountryByNameEmployee(name);
  return uuid;
}

async function getIdVerifLevelClient(name) {
  let uuid = await usersPGRepository.getIdVerifLevelByNameClient(name);
  return uuid;
}

// usersService.getDataFromSheetsClients = async (req, res, next) => {
//   try {
//     let countryResp = null;
//     let sess = null;

//     // let data = await usersPGRepository.getusersClientById(req.params.id);

//     const dimensions = { col: 1, row: 1, finalCol: 21, finalRow: 45 };
//     const data = await table(dimensions);
//     let userObj;

//     data.data.forEach(async (d) => {
//       userObj = {};

//       userObj = {
//         first_name: extractFirstName(d.names_user),
//         second_name: extractSecondName(d.names_user),
//         last_name: extractLastName(d.lastnames_user),
//         second_last_name: extractSecondLastName(d.lastnames_user),
//         username: extractUsername(d.email_user),
//         email_user: d.email_user,
//         password: "12345678",
//         cod_user_serv_public: d.public_code,
//         cod_rank: d.cod_rank,
//         register_ini_apb: true,
//         multi_country: true,
//         gender: d.gender,
//         date_birth: d.date_birth ? d.date_birth : "9999-12-30",
//         ident_doc_number: d.doc_identidad,
//         main_phone: d.main_phone,
//         main_phone_wha: true,
//         second_phone: null,
//         second_phone_wha: false,
//         delegated_phone: null,
//         delegated_phone_wha: false,
//         resid_city: d.resid_city,
//         address: d.address,
//         referral_node: d.referral_node,
//         main_sn_platf: "TWT",
//         ok_legal_terms: okLegalTermsBool(d.ok_legal_terms),
//         date_legacy_reg: d.date_legacy_reg ? d.date_legacy_reg : "9999-12-30",
//         departments: await getDepartmentsClient(d.departments),
//         uuid_profile: await getUUIDProfileClient("Perfil Inicial"), //buscar en db
//         id_service: await getIdServiceClient("SIXMAP"), //buscar en db
//         id_services_utype: await getIdUTypeClient("Operador"), //buscar en db
//         id_ident_doc_type: await getIdDocTypeClient(d.ident_doc_type), //buscar en db
//         id_resid_country: await getIdResidCountryClient(d.resid_country), //buscar en db
//         id_nationality_country: (await getIdNatCountryClient(d.nacionality))
//           ? await getIdNatCountryClient(d.nacionality)
//           : "3786007", //buscar en db
//         last_ip_registred: req.clientIp,
//         id_verif_level: await getIdVerifLevelClient(d.user_verif_level), //buscar en db
//       };

//       await usersPGRepository.createUserClient(userObj);
//     });

//     const resp = authenticationPGRepository.getIpInfo(req.clientIp);
//     if (resp) countryResp = resp.country_name;
//     if (await authenticationPGRepository.getSessionById(req.sessionID))
//       sess = req.sessionID;

//     const log = {
//       is_auth: req.isAuthenticated(),
//       success: true,
//       failed: false,
//       ip: req.clientIp,
//       country: countryResp,
//       route: "/users/getDataFromSheets",
//       session: sess,
//     };
//     authenticationPGRepository.insertLogMsg(log);
//     res.status(200).json(data.data);
//   } catch (error) {
//     next(error);
//   }
// };

// usersService.getDataFromSheetsEmployees = async (req, res, next) => {
//   try {
//     let countryResp = null;
//     let sess = null;

//     // let data = await usersPGRepository.getusersClientById(req.params.id);

//     const dimensions = { col: 1, row: 1, finalCol: 21, finalRow: 45 };
//     const data = await table(dimensions);
//     let userObj;

//     data.data.forEach(async (d) => {
//       userObj = {};

//       userObj = {
//         first_name: extractFirstName(d.names_user),
//         second_name: extractSecondName(d.names_user)
//           ? extractSecondName(d.names_user)
//           : "",
//         last_name: extractLastName(d.lastnames_user),
//         second_last_name: extractSecondLastName(d.lastnames_user),
//         username: extractUsername(d.email_user),
//         email_user: d.email_user,
//         password: "12345678",
//         register_ini_apb: true,
//         multi_country: true,
//         gender: d.gender,
//         date_birth: d.date_birth ? d.date_birth : "9999-12-30",
//         ident_doc_number: d.doc_identidad,
//         main_phone: d.main_phone,
//         main_phone_wha: true,
//         second_phone: "",
//         second_phone_wha: false,
//         delegated_phone: "",
//         delegated_phone_wha: false,
//         resid_city: d.resid_city ? d.resid_city : "",
//         ok_legal_terms: okLegalTermsBool(d.ok_legal_terms),
//         departments: await getDepartmentsEmployee(d.departments),
//         uuid_profile: await getUUIDProfileEmployee("Perfil Inicial"), //buscar en db
//         id_service: await getIdServiceEmployee("SIXMAP"), //buscar en db
//         id_services_utype: await getIdUTypeEmployee("Operador"), //buscar en db
//         id_ident_doc_type: await getIdDocTypeEmployee(d.ident_doc_type), //buscar en db
//         id_resid_country: await getIdResidCountryEmployee(d.resid_country), //buscar en db
//         id_nationality_country: (await getIdNatCountryEmployee(d.nacionality))
//           ? await getIdNatCountryEmployee(d.nacionality)
//           : "4904430", //buscar en db
//         last_ip_registred: req.clientIp,
//       };

//       await usersPGRepository.createUser(userObj);
//     });

//     const resp = authenticationPGRepository.getIpInfo(req.clientIp);
//     if (resp) countryResp = resp.country_name;
//     if (await authenticationPGRepository.getSessionById(req.sessionID))
//       sess = req.sessionID;

//     const log = {
//       is_auth: req.isAuthenticated(),
//       success: true,
//       failed: false,
//       ip: req.clientIp,
//       country: countryResp,
//       route: "/users/getDataFromSheets",
//       session: sess,
//     };
//     authenticationPGRepository.insertLogMsg(log);
//     res.status(200).json(data.data);
//   } catch (error) {
//     next(error);
//   }
// };

usersService.blockClient = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    await usersPGRepository.blockClient(req.params.id);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/blockClient",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json({ message: "User blocked succesfully" });
  } catch (error) {
    next(error);
  }
};

usersService.blockEmployee = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    await usersPGRepository.blockEmployee(req.params.id);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/blockEmployee",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json({ message: "User blocked succesfully" });
  } catch (error) {
    next(error);
  }
};

usersService.unblockClient = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    await usersPGRepository.unblockClient(req.params.id);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/unblockClient",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json({ message: "User unblocked succesfully" });
  } catch (error) {
    next(error);
  }
};

usersService.unblockEmployee = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    await usersPGRepository.unblockEmployee(req.params.id);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/unblockEmployee",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json({ message: "User unblocked succesfully" });
  } catch (error) {
    next(error);
  }
};

usersService.approveLevelCero = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    await usersPGRepository.approveLevelCero(req.params.id);

    const resp = authenticationPGRepository.getIpInfo(req.clientIp);
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.clientIp,
      country: countryResp,
      route: "/users/approveLevelCero",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json({ message: "User level cero approved succesfully" });
  } catch (error) {
    next(error);
  }
};

export default usersService;
