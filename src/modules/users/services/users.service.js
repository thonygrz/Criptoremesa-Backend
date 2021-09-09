import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import usersPGRepository from "../repositories/users.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import auth from "../../../utils/auth";
import bcrypt from "bcryptjs";
import formidable from "formidable";
import fs from "fs";
// import { table } from "../../../utils/googleSpreadSheets";
import { env } from "../../../utils/enviroment";
import mailSender from '../../../utils/mail';

const usersService = {};
const context = "users Service";
let events = {};

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
  console.log("DATA: ", data);
  data = data.map(function (d) {
    if (d.user_active && d.verif_level_apb) {
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
        id_verif_level: d.id_verif_level,
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
        verif_level_apb: "Verificado",
      };
    } else if (d.user_active && !d.verif_level_apb) {
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
        id_verif_level: d.id_verif_level,
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
        verif_level_apb: "Pendiente",
      };
    } else if (!d.user_active && d.verif_level_apb) {
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
        id_verif_level: d.id_verif_level,
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
        verif_level_apb: "Verificado",
      };
    } else if (!d.user_active && !d.verif_level_apb) {
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
        id_verif_level: d.id_verif_level,
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
        verif_level_apb: "Pendiente",
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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
                key: "id_verif_level",
              },
              {
                key: "verif_level_apb",
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
            name: "Nivel de Verificación",
            key: "id_verif_level",
            parent: "datos_administrativos",
          },
          {
            name: "Estatus Nivel de Verificación",
            key: "verif_level_apb",
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
        {
          key: "verif_level_apb",
          colors: {
            Verificado: 2,
            Pendiente: 1,
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
      last_ip_registred: req.connection.remoteAddress,
      main_phone_code: req.body.main_phone_code,
      main_phone_full: req.body.main_phone_full,
      second_phone_code: req.body.second_phone_code,
      second_phone_full: req.body.second_phone_full,
      delegated_phone_code: req.body.delegated_phone_code,
      delegated_phone_full: req.body.delegated_phone_full,
    };
    await usersPGRepository.createUser(userObj);

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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
      verif_level_apb: req.body.verif_level_apb,
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
      last_ip_registred: req.connection.remoteAddress,
      id_verif_level: req.body.id_verif_level,
      main_phone_code: req.body.main_phone_code,
      main_phone_full: req.body.main_phone_full,
      second_phone_code: req.body.second_phone_code,
      second_phone_full: req.body.second_phone_full,
      delegated_phone_code: req.body.delegated_phone_code,
      delegated_phone_full: req.body.delegated_phone_full,
    };
    await usersPGRepository.createUserClient(userObj);

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

usersService.createNewClient = async (req, res, next) => {
  try {
    if (!req.body.captcha) {
      res.status(400).json({
        captchaSuccess: false,
        msg: "Ha ocurrido un error. Por favor completa el captcha",
      });
    } else {
        // Secret key
      const secretKey = env.reCAPTCHA_SECRET_KEY;

      // Verify URL
      const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

      // Make a request to verifyURL
      const body = await axios.get(verifyURL);

      // // If not successful
      if (body.data.success === false) {
        res
          .status(500)
          .json({ captchaSuccess: false, msg: "Falló la verificación del Captcha" });
      }
      else{
          // If successful
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
      cust_cr_cod_pub: req.body.cust_cr_cod_pub,
      cod_rank: req.body.cod_rank,
      verif_level_apb: req.body.verif_level_apb,
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
      last_ip_registred: req.connection.remoteAddress,
      id_verif_level: req.body.id_verif_level,
      main_phone_code: req.body.main_phone_code,
      main_phone_full: req.body.main_phone_full,
      second_phone_code: req.body.second_phone_code,
      second_phone_full: req.body.second_phone_full,
      delegated_phone_code: req.body.delegated_phone_code,
      delegated_phone_full: req.body.delegated_phone_full,
    };
    const response = await usersPGRepository.createNewClient(userObj);
    console.log("RESPNSE: ", response);
    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/users/createNewClient",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json({
      msg: "User registred succesfully",
      user: response,
      captchaSuccess: true,
    });
    }
    }
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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
//         verif_level_apb: false,
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
//         last_ip_registred: req.connection.remoteAddress,
//         id_verif_level: await getIdVerifLevelClient(d.user_verif_level), //buscar en db
//       };

//       await usersPGRepository.createUserClient(userObj);
//     });

//     const resp = authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
//     if (resp) countryResp = resp.country_name;
//     if (await authenticationPGRepository.getSessionById(req.sessionID))
//       sess = req.sessionID;

//     const log = {
//       is_auth: req.isAuthenticated(),
//       success: true,
//       failed: false,
//       ip: req.connection.remoteAddress,
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
//         verif_level_apb: true,
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
//         last_ip_registred: req.connection.remoteAddress,
//       };

//       await usersPGRepository.createUser(userObj);
//     });

//     const resp = authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
//     if (resp) countryResp = resp.country_name;
//     if (await authenticationPGRepository.getSessionById(req.sessionID))
//       sess = req.sessionID;

//     const log = {
//       is_auth: req.isAuthenticated(),
//       success: true,
//       failed: false,
//       ip: req.connection.remoteAddress,
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
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

usersService.files = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    // await usersPGRepository.unblockEmployee(req.params.id);

    // const resp = authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
    // if (resp) countryResp = resp.country_name;
    // if (await authenticationPGRepository.getSessionById(req.sessionID))
    //   sess = req.sessionID;

    // const log = {
    //   is_auth: req.isAuthenticated(),
    //   success: true,
    //   failed: false,
    //   ip: req.connection.remoteAddress,
    //   country: countryResp,
    //   route: "/users/unblockEmployee",
    //   session: sess,
    // };
    // authenticationPGRepository.insertLogMsg(log);

    let fileError = false;
    let filePath = "";
    let fileSize = "";
    let fileType = "";

    // events = [
    //   {
    //     event: "error",
    //     action: function (err) {
    //       fileError = true;
    //       console.log("err::", err);
    //       next({
    //         message: `El archivo subido ha excedido el límite, vuelve a intentar con uno menor a ${form.maxFileSize} B`,
    //       });
    //     },
    //   },
    //   {
    //     event: "fileBegin",
    //     action: function (req, res, next, name, file) {
    //       filePath = file.path;
    //       fileSize = file.size;
    //       fileType = file.type;

    //       console.log("fileError ", fileError);
    //       console.log("fileType ", fileType);

    //       if (
    //         !fileError &&
    //         (fileType === "image/png" ||
    //           fileType === "image/jpg" ||
    //           fileType === "image/jpeg" ||
    //           fileType === "image/gif" ||
    //           fileType === "application/pdf")
    //       ) {
    //         fs.rename(filePath, form.uploadDir + "/pruebaFE7", (error) => {
    //           if (error) {
    //             // Show the error
    //             next(error);
    //           } else {
    //             // List all the filenames after renaming
    //             res.status(200).json({ message: "Archivo guardado" });
    //           }
    //         });
    //       } else {
    //         console.log("filePath ", filePath);
    //         console.log("fileSize ", fileSize);
    //         console.log("fileType ", fileType);
    //         next({
    //           message: `El archivo subido no tiene un formato permitido`,
    //         });
    //       }
    //     },
    //   },
    // ];

    const form = formidable({
      multiples: true,
      uploadDir: env.FILES_DIR,
      maxFileSize: 2 * 1024 * 1024,
      keepExtensions: true,
    });

    form.on("error", function (err) {
      // console.log("An error has occured with form upload: ", err.message);
      fileError = true;
      console.log("err::", err);
      next({
        message: `El archivo subido ha excedido el límite, vuelve a intentar con uno menor a ${form.maxFileSize} B`,
      });
    });

    form.on("field", (name, value) => {
      console.log("field name: ", name);
      console.log("field value: ", value);
    });

    form.on("file", function (field, file) {
      //rename the incoming file to the file's name
      filePath = file.path;
      fileSize = file.size;
      fileType = file.type;
      console.log("filePath on", filePath);
      console.log("fileSize on", fileSize);
      console.log("fileType on", fileType);
    });

    // form.onPart = function (part) {
    //   // let formidable handle only non-file parts
    //   console.log("part: ", part);

    //   if (part.filename === "" || !part.mime) {
    //     // used internally, please do not override!
    //     form.handlePart(part);
    //   }
    // };
    form.parse(req, function (err, fields, files) {
      console.log("fileError ", fileError);
      console.log("fileType ", fileType);

      if (
        !fileError &&
        (fileType === "image/png" ||
          fileType === "image/jpg" ||
          fileType === "image/jpeg" ||
          fileType === "image/gif" ||
          fileType === "application/pdf")
      ) {
        fs.rename(filePath, form.uploadDir + "/pruebaFE9", (error) => {
          if (error) {
            // Show the error
            next(error);
          } else {
            // List all the filenames after renaming
            res.status(200).json({ message: "Archivo guardado" });
          }
        });
      } else {
        console.log("filePath ", filePath);
        console.log("fileSize ", fileSize);
        console.log("fileType ", fileType);
        next({
          message: `El archivo subido no tiene un formato permitido`,
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

usersService.requestLevelOne1stQ = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/users/requestLevelOne1stQ",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    let fileError = false;

    const form = formidable({
      multiples: true,
      uploadDir: env.FILES_DIR,
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
    });

    form.onPart = (part) => {
      console.log("part: ", part.mime);
      if (
        !fileError &&
        !(
          part.mime === "image/png" ||
          part.mime === "image/jpg" ||
          part.mime === "image/jpeg" ||
          part.mime === "image/gif" ||
          part.mime === "application/pdf" ||
          part.mime === null
        )
      ) {
        console.log("entro ");

        fileError = true;
        form.emit("error");
      } else {
        form.handlePart(part);
      }
    };

    form.on("error", function (err) {
      if (fileError) {
        next({
          message: `Uno o varios archivos no tienen formato permitido`,
        });
      } else {
        fileError = true;
        console.log("error dentro del formerror: ", err);

        next({
          message: `El archivo subido ha excedido el límite, vuelve a intentar con uno menor a ${form.maxFileSize} B`,
        });
      }
    });

    form.parse(req, async function (err, fields, files) {
      console.log("fileError ", fileError);
      console.log("files ", files);
      console.log("fields ", fields);

      let doc_path = form.uploadDir + `/${fields.uuid_user}__${files.doc.name}`;
      let selfie_path =
        form.uploadDir + `/${fields.uuid_user}__${files.selfie.name}`;

      Object.values(files).forEach((f) => {
        if (
          f.type === "image/png" ||
          f.type === "image/jpg" ||
          f.type === "image/jpeg" ||
          f.type === "image/gif" ||
          f.type === "application/pdf"
        ) {
          fs.rename(
            f.path,
            form.uploadDir + `/${fields.uuid_user}__${f.name}`,
            (error) => {
              if (error) {
                console.log("error dentro del rename: ", error);
                next(error);
              }
            }
          );
        }
      });
      try {
        if (!fileError) {
          console.log("FILE DOC: ", doc_path);
          console.log("FILE SELFIE: ", selfie_path);
          console.log("a la bd: ", {
            date_birth: fields.date_birth,
            state_name: fields.state_name,
            resid_city: fields.resid_city,
            pol_exp_per: fields.pol_exp_per,
            email_user: fields.email_user,
            id_ident_doc_type: fields.id_ident_doc_type,
            ident_doc_number: fields.ident_doc_number,
            occupation: fields.occupation,
            doc_path: doc_path,
            selfie_path: selfie_path,
          });
          await usersPGRepository.requestLevelOne1stQ({
            date_birth: fields.date_birth,
            state_name: fields.state_name,
            resid_city: fields.resid_city,
            pol_exp_per: fields.pol_exp_per,
            email_user: fields.email_user,
            id_ident_doc_type: fields.id_ident_doc_type,
            ident_doc_number: fields.ident_doc_number,
            occupation: fields.occupation,
            doc_path: doc_path,
            selfie_path: selfie_path,
          });

          res.status(200).json({ message: "Archivos subidos" });
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    console.log("error dentro del catch: ", error);

    next(error);
  }
};

let answersToRepo = 'ARRAY[';

function setAnswersToRepo (val) {
  answersToRepo = val;
}

function getAnswersToRepo () {
  return answersToRepo;
}

usersService.requestLevelTwo = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;
    setAnswersToRepo('ARRAY[')

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/users/requestLevelTwo",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    let fileError = false;

    const form = formidable({
      multiples: true,
      uploadDir: env.FILES_DIR,
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
    });

    form.onPart = (part) => {
      console.log("part: ", part.mime);
      if (
        !fileError &&
        !(
          part.mime === "image/png" ||
          part.mime === "image/jpg" ||
          part.mime === "image/jpeg" ||
          part.mime === "image/gif" ||
          part.mime === "application/pdf" ||
          part.mime === null
        )
      ) {
        console.log("entro ");

        fileError = true;
        form.emit("error");
      } else {
        form.handlePart(part);
      }
    };

    form.on("error", function (err) {
      if (fileError) {
        next({
          message: `Uno o varios archivos no tienen formato permitido`,
        });
      } else {
        fileError = true;
        console.log("error dentro del formerror: ", err);

        next({
          message: `El archivo subido ha excedido el límite, vuelve a intentar con uno menor a ${form.maxFileSize} B`,
        });
      }
    });

    form.parse(req, async function (err, fields, files) {
      console.log("fileError ", fileError);
      console.log("files ", files);
      console.log("fields ", fields);

      let residency_proof_path = form.uploadDir + `/${fields.email_user}__${files.residency_proof.name}`;
      
      Object.values(files).forEach((f) => {
        if (
          f.type === "image/png" ||
          f.type === "image/jpg" ||
          f.type === "image/jpeg" ||
          f.type === "image/gif" ||
          f.type === "application/pdf"
        ) {
          fs.rename(
            f.path,
            form.uploadDir + `/${fields.email_user}__${f.name}`,
            (error) => {
              if (error) {
                console.log("error dentro del rename: ", error);
                next(error);
              }
            }
          );
        }
      });
      try {
        if (!fileError) {
          console.log("FILE residency_proof_path: ", residency_proof_path);
          console.log("a la bd: ", {
            funds_source: fields.funds_source,
            residency_proof_path: residency_proof_path,
            answers: JSON.parse(fields.answers),
            email_user: fields.email_user
          });

          JSON.parse(fields.answers).forEach((a) => {
            setAnswersToRepo(getAnswersToRepo() + `,\'${JSON.stringify(a)}\'::JSON`);
          })

          setAnswersToRepo(getAnswersToRepo()+']::json[]')
          setAnswersToRepo(getAnswersToRepo().replace(',',''))

          console.log(getAnswersToRepo())

          // console.log(JSON.parse(fields.answers))

          await usersPGRepository.requestLevelTwo({
            funds_source: fields.funds_source,
            residency_proof_path: residency_proof_path,
            answers: getAnswersToRepo(),
            email_user: fields.email_user
          });

          res.status(200).json({ message: "Archivos subidos" });
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    console.log("error dentro del catch: ", error);

    next(error);
  }
};

usersService.requestLevelOne2ndQ = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/users/requestLevelOne2ndQ",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    let fileError = false;

    const form = formidable({
      multiples: true,
      uploadDir: env.FILES_DIR,
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
    });

    form.onPart = (part) => {
      console.log("part: ", part.mime);
      if (
        !fileError &&
        !(
          part.mime === "image/png" ||
          part.mime === "image/jpg" ||
          part.mime === "image/jpeg" ||
          part.mime === "image/gif" ||
          part.mime === "application/pdf" ||
          part.mime === null
        )
      ) {
        console.log("entro ");

        fileError = true;
        form.emit("error");
      } else {
        form.handlePart(part);
      }
    };

    form.on("error", function (err) {
      if (fileError) {
        next({
          message: `Uno o varios archivos no tienen formato permitido`,
        });
      } else {
        fileError = true;
        console.log("error dentro del formerror: ", err);

        next({
          message: `El archivo subido ha excedido el límite, vuelve a intentar con uno menor a ${form.maxFileSize} B`,
        });
      }
    });

    form.parse(req, async function (err, fields, files) {
      console.log("fileError ", fileError);
      console.log("files ", files);
      console.log("fields ", fields);

      let doc_path = form.uploadDir + `/${fields.uuid_user}__${files.doc.name}`;
      let selfie_path =
        form.uploadDir + `/${fields.uuid_user}__${files.selfie.name}`;

      Object.values(files).forEach((f) => {
        if (
          f.type === "image/png" ||
          f.type === "image/jpg" ||
          f.type === "image/jpeg" ||
          f.type === "image/gif" ||
          f.type === "application/pdf"
        ) {
          fs.rename(
            f.path,
            form.uploadDir + `/${fields.uuid_user}__${f.name}`,
            (error) => {
              if (error) {
                console.log("error dentro del rename: ", error);
                next(error);
              }
            }
          );
        }
      });
      try {
        if (!fileError) {
          console.log("FILE DOC: ", doc_path);
          console.log("FILE SELFIE: ", selfie_path);
          await usersPGRepository.requestLevelOne2ndQ({
            date_birth: fields.date_birth,
            state_name: fields.state_name,
            resid_city: fields.resid_city,
            pol_exp_per: fields.pol_exp_per,
            email_user: fields.email_user,
            id_country: fields.id_country,
            ident_doc_number: fields.ident_doc_number,
            occupation: fields.occupation,
            doc_path: doc_path,
            selfie_path: selfie_path,
          });

          res.status(200).json({ message: "Archivos subidos" });
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    console.log("error dentro del catch: ", error);

    next(error);
  }
};

usersService.requestLevelOne3rdQ = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/users/requestLevelOne3rdQ",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    let fileError = false;

    const form = formidable({
      multiples: true,
      uploadDir: env.FILES_DIR,
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
    });

    form.onPart = (part) => {
      console.log("part: ", part.mime);
      if (
        !fileError &&
        !(
          part.mime === "image/png" ||
          part.mime === "image/jpg" ||
          part.mime === "image/jpeg" ||
          part.mime === "image/gif" ||
          part.mime === "application/pdf" ||
          part.mime === null
        )
      ) {
        console.log("entro ");

        fileError = true;
        form.emit("error");
      } else {
        form.handlePart(part);
      }
    };

    form.on("error", function (err) {
      if (fileError) {
        next({
          message: `Uno o varios archivos no tienen formato permitido`,
        });
      } else {
        fileError = true;
        console.log("error dentro del formerror: ", err);

        next({
          message: `El archivo subido ha excedido el límite, vuelve a intentar con uno menor a ${form.maxFileSize} B`,
        });
      }
    });

    form.parse(req, async function (err, fields, files) {
      console.log("fileError ", fileError);
      console.log("files ", files);
      console.log("fields ", fields);

      let doc_path = form.uploadDir + `/${fields.uuid_user}__${files.doc.name}`;
      let selfie_path =
        form.uploadDir + `/${fields.uuid_user}__${files.selfie.name}`;

      Object.values(files).forEach((f) => {
        if (
          f.type === "image/png" ||
          f.type === "image/jpg" ||
          f.type === "image/jpeg" ||
          f.type === "image/gif" ||
          f.type === "application/pdf"
        ) {
          fs.rename(
            f.path,
            form.uploadDir + `/${fields.uuid_user}__${f.name}`,
            (error) => {
              if (error) {
                console.log("error dentro del rename: ", error);
                next(error);
              }
            }
          );
        }
      });
      try {
        if (!fileError) {
          console.log("FILE DOC: ", doc_path);
          console.log("FILE SELFIE: ", selfie_path);
          await usersPGRepository.requestLevelOne3rdQ({
            date_birth: fields.date_birth,
            state_name: fields.state_name,
            resid_city: fields.resid_city,
            pol_exp_per: fields.pol_exp_per,
            email_user: fields.email_user,
            id_country: fields.id_country,
            ident_doc_number: fields.ident_doc_number,
            occupation: fields.occupation,
            doc_path: doc_path,
            selfie_path: selfie_path,
          });

          res.status(200).json({ message: "Archivos subidos" });
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    console.log("error dentro del catch: ", error);

    next(error);
  }
};

usersService.forgotPassword = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    let data = await usersPGRepository.validateEmailAndGenerateCode(req.body.email_user);
    console.log('DATA: ',data)
    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/users/forgotPassword",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    if (data.msg === 'Code generated'){
      const mailResp = await mailSender.sendForgotPasswordMail({
        email_user: req.body.email_user,
        code: data.code
      })

      res.status(200).json(
        {
          msg: data.msg,
          mailResp
        });
    } else if (data.msg === 'The email does not exist') {
      res.status(400).json({msg: data.msg});
    }
  } catch (error) {
    next(error);
  }
};

usersService.newPassword = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    let passwordList = await usersPGRepository.getLastPasswords(req.body.email_user);
    let matchSome = false;

    
    // let data = await usersPGRepository.newPassword(req.body);
    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/users/newPassword",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    passwordList.forEach(async (p) => {
      let match = await bcrypt.compare(req.body.new_password, p.password);

      if (match) {
        matchSome = true;
        res.status(400).json({msg: 'The password cannot be equal to last 3'});
      }
    })

    if (!matchSome) {
      let newPass = await bcrypt.hash(req.body.new_password, 10);

      let data = await usersPGRepository.newPassword({
        email_user: req.body.email_user,
        new_password: newPass
      });
      res.status(200).json(data);
    }

    // res.status(200).json(passwordList);
  } catch (error) {
    next(error);
  }
};

usersService.getusersClientByEmail = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    let data = await usersPGRepository.getusersClientByEmail(req.params.id);

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/users/geClientByEmail",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(data[0]);
  } catch (error) {
    next(error);
  }
};

usersService.sendVerificationCodeByEmail = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    let data = await usersPGRepository.validateEmailAndGenerateCode(req.body.email_user);
    console.log('DATA: ',data)
    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/users/sendVerificationCodeByEmail",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    if (data.msg === 'Code generated'){
      const mailResp = await mailSender.sendSignUpMail({
        email_user: req.body.email_user,
        code: data.code
      })

      res.status(200).json(
        {
          msg: data.msg,
          mailResp
        });
    } else if (data.msg === 'The email does not exist') {
      res.status(400).json({msg: data.msg});
    }
  } catch (error) {
    next(error);
  }
};

usersService.approveLevelOne = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    await usersPGRepository.approveLevelOne(req.body);

    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/users/approveLevelOne",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json({ message: "User level One approved succesfully" });
  } catch (error) {
    next(error);
  }
};

usersService.getLevelQuestions = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    let data = await usersPGRepository.getLevelQuestions();
    let answers = await usersPGRepository.getLevelAnswers();
    let respArr = [];

    data = data.map(function(q) {
      respArr = answers.filter(a => {
        return q.id_level_question == a.id_level_question;
      });
      return {
        id_level_question: q.id_level_question,
        level: q.level,
        question_number: q.question_number,
        question: q.question,
        question_type: q.question_type,
        answers: respArr
      }
    });
    
    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/users/getLevelQuestions",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    // res.status(200).json(respArr);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default usersService;
export { events };
