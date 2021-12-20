import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import veriflevelsPGRepository from "../repositories/veriflevels.pg.repository";
import auth from "../../../utils/auth";
import fs from "fs";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const veriflevelsService = {};
const context = "veriflevels Service";

veriflevelsService.getveriflevels = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);

    let data = await veriflevelsPGRepository.getveriflevels(req.body); 

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
      route: "/veriflevels/getActive",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.requestWholesalePartner = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    const dbResp = await veriflevelsPGRepository.requestWholesalePartner({
      reasons: req.body.reasons,
      strenghts: req.body.strenghts,
      remittance_service: req.body.remittance_service,
      old_resid_client_countries: req.body.old_resid_client_countries.join(),
      profession: req.body.profession,
      resid_country: req.body.resid_country,
      migration_status: req.body.migration_status,
      new_resid_client_countries: req.body.new_resid_client_countries.join(),
      clients_number: req.body.clients_number.toString(),
      monthly_amount: req.body.monthly_amount,
      monetary_growth: req.body.monetary_growth,
      clients_growth: req.body.clients_growth.toString(),
      bussiness_name: req.body.bussiness_name,
      web_page_exp: req.body.web_page_exp,
      logo: req.body.logo,
      email_user: req.body.email_user,
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
      route: "/veriflevels/requestWholesalePartner",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(dbResp);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.notifications = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    const dbResp = await veriflevelsPGRepository.notifications(req.params.email_user);

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
      route: "/veriflevels/notifications",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    if (dbResp === null)
      res.status(200).json([]);
    else
    res.status(200).json(dbResp);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.deactivateNotification = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    const dbResp = await veriflevelsPGRepository.deactivateNotification(req.params.id);

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
      route: "/veriflevels/deactivateNotification",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(dbResp);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.readNotification = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    const dbResp = await veriflevelsPGRepository.readNotification(req.params.id);

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
      route: "/veriflevels/readNotification",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(dbResp);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.getWholesalePartnerRequestsCountries = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Getting Wholesale Partners Requests countries from DB`);
    ObjLog.log(`[${context}]: Getting Wholesale Partners Requests countries from DB`);

    const bdResp = await veriflevelsPGRepository.getWholesalePartnerRequestsCountries();

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
      route: "/veriflevels/getWholesalePartnerRequestsCountries",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(bdResp);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.getMigrationStatus = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Getting migration status from DB`);
    ObjLog.log(`[${context}]: Getting migration status from DB`);

    const bdResp = await veriflevelsPGRepository.getMigrationStatus();

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
      route: "/veriflevels/getMigrationStatus",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(bdResp);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.getDisapprovedVerifLevelsRequirements = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Getting Disapproved VerifLevels Requirements from DB`);
    ObjLog.log(`[${context}]: Getting Disapproved VerifLevels Requirements from DB`);

    const bdResp = await veriflevelsPGRepository.getDisapprovedVerifLevelsRequirements(
      req.params.id
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
      route: "/veriflevels/getDisapprovedVerifLevelsRequirements",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(bdResp);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.getDisapprovedWholesalePartnersRequirements = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Getting Disapproved Wholesale Partners Requirements from DB`);
    ObjLog.log(`[${context}]: Getting Disapproved Wholesale Partners Requirements from DB`);

    const bdResp = await veriflevelsPGRepository.getDisapprovedWholesalePartnersRequirements(
      req.params.id
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
      route: "/veriflevels/getDisapprovedWholesalePartnersRequirements",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(bdResp);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.getLimitationsByCountry = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Getting Limitations from DB`);
    ObjLog.log(`[${context}]: Getting Limitations from DB`);

    const bdResp = await veriflevelsPGRepository.getLimitationsByCountry(
      req.params.id
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
      route: "/veriflevels/getLimitationsByCountry",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    res.status(200).json(bdResp);
  } catch (error) {
    next(error);
  }
};

veriflevelsService.getVerifLevelRequirements = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Getting requirements from DB`);
    ObjLog.log(`[${context}]: Getting requirements from DB`);

    const bdResp = await veriflevelsPGRepository.getVerifLevelRequirements(
      req.params.id
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
      route: "/veriflevels/getVerifLevelRequirements",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    if (bdResp.level_one) {
      let doc = fs.readFileSync(bdResp.level_one[0].req_use_path)
      let selfie = fs.readFileSync(bdResp.level_one[1].req_use_path)

      bdResp.level_one.forEach((el) => {
        if (el.req_type === "doc") el.req_use_path = doc;
        else if (el.req_type === "selfie") el.req_use_path = selfie;
      });
    }
    if (bdResp.level_two) {
      let residency_proof = fs
        .readFileSync(bdResp.level_two[1].req_use_path)
      bdResp.level_two.forEach((el) => {
        if (el.req_type === "residency_proof")
          el.req_use_path = residency_proof;
      });
    }
    res.status(200).json({
      level_one: bdResp.level_one,
      level_two: bdResp.level_two,
      email_user: bdResp.email_user,
    });
  } catch (error) {
    next(error);
  }
};

veriflevelsService.getWholesalePartnerRequestsRequirements = async (
  req,
  res,
  next
) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: Getting requirements from DB`);
    ObjLog.log(`[${context}]: Getting requirements from DB`);

    const bdResp =
      await veriflevelsPGRepository.getWholesalePartnerRequestsRequirements(
        req.params.id
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
      route: "/veriflevels/getWholesalePartnerRequestsRequirements",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(bdResp);
  } catch (error) {
    next(error);
  }
};



veriflevelsService.validateRemittance = async (
  req,
  res,
  next
) => {
  try {
    let countryResp = null;
    let sess = null;

    logger.info(`[${context}]: prooving from DB`);
    ObjLog.log(`[${context}]: prooving from DB`);

    const bdResp =
      await veriflevelsPGRepository.validateRemittance(
                                                        {
                                                          "idChat": "2",
                                                          "publicCode": 'UISCR30064', 
                                                          "messages": [
                                                              {
                                                                  "id": 3,
                                                                  "action": "send",
                                                                  "type": "text",
                                                                  "atcUser": "AtcUser",
                                                                  "atcUserLastname": "Rodriguez",
                                                                  "profile": "Perfil",
                                                                  "atcUserName": "usuario123",
                                                                  "date": 1636135966,
                                                                  "check": true,
                                                                  "content": "Remesa por 500 mil pesos colombianos\n                    Depositados en Bancolombia Simon Gómez \n                    Mar 12/10/2021\n                    Referido por Jonathan Requena\n                    CR-ID: 092CR10008\n                    No aplica descuento por corresponsal, se hizo transferencia bancaria.\n                    ----\n                    2 Cuentas Destino en Venezuela:\n                    -----\n                    1) Banco Exterior\n                    01150017044003416059\n                    Luz Marina Caballero de Ayala\n                    C.I  17160895\n                    Aquí son 420.000 pesos\n                    ----\n                    2) BanCaribe\n                    01140172401721079178\n                    Janetth Pereira Soto\n                    C.I. 2996390 \n                    A esta cta son 80.000 pesos"
                                                              }
                                                          ],
                                                          "pending": false,
                                                          "holder": {
                                                              "idBankAccount": 20,
                                                              "holderName": "CR Tecnología y Finanzas SpA",
                                                              "accountNumber": "170 092 9902"
                                                          },
                                                          "originCountry": {
                                                              "idCountry": 4,
                                                              "name": "Chile",
                                                              "code": "CL"
                                                          },
                                                          "countryCurrency": {
                                                              "idCourrency": 4,
                                                              "name": "Peso Chileno",
                                                              "isoCode": "CLP",
                                                              "type": "fiat"
                                                          },
                                                          "bank": {
                                                              "idBank": 11,
                                                              "name": "Banco de Chile"
                                                          },
                                                          "thirdPartyTransfer": {
                                                              "response": false,
                                                              "country": {
                                                                  "idCountry": 4,
                                                                  "name": "Chile",
                                                                  "code": "CL"
                                                              },
                                                              "bank": {
                                                                  "idBank": 11,
                                                                  "name": ""
                                                              },
                                                              "holder": "Luis Gabriel Perez",
                                                              "id": "25698565"
                                                          },
                                                          "captures": [
                                                              {
                                                                  "messageId": 1,
                                                                  "ammount": 5000,
                                                                  "ref": "231123",
                                                                  "date": "2021-12-01"
                                                              }
                                                          ],
                                                          "totalDeposited": 5000,
                                                          "totalComission": 12,
                                                          "totalOriginRemittance": 4988,
                                                          "totalDestinationRemittance": 18006.68,
                                                          "rateType": {
                                                              "idRateType": 1,
                                                              "name": "Normal"
                                                          },
                                                          "rateValue": {
                                                              "rate": 3.61,
                                                              "operation": "mul"
                                                          },
                                                          "beneficiariesInfo": {
                                                              "destinationCountry": {
                                                                  "idCountry": 1,
                                                                  "name": "Venezuela",
                                                                  "code": "VE"
                                                              },
                                                              "destinationCurrency": {
                                                                  "idCourrency": 1,
                                                                  "name": "Bolivar",
                                                                  "isoCode": "VED",
                                                                  "type": "fiat"
                                                              },
                                                              "quantity": 1,
                                                              "beneficiaries": [
                                                                  {
                                                                      "name": {
                                                                          "value": "Beneficiario",
                                                                          "pending": false
                                                                      },
                                                                      "bank": {
                                                                          "value": {
                                                                              "idBank": 2,
                                                                              "name": "Mercantil"
                                                                          },
                                                                          "pending": false
                                                                      },
                                                                      "notification": {
                                                                          "idNotificationType": -1,
                                                                          "fields": [],
                                                                          "name": {
                                                                              "value": "No notificar",
                                                                              "pending": false
                                                                          },
                                                                          "phoneNumber": {
                                                                              "value": "",
                                                                              "pending": false
                                                                          },
                                                                          "email": {
                                                                              "value": "",
                                                                              "pending": false
                                                                          }
                                                                      },
                                                                      "paymentType": {
                                                                          "value": {
                                                                              "idPayMethod": 1,
                                                                              "name": "Transferencia",
                                                                              "fields": [
                                                                                  "Banco",
                                                                                  "Nro. Cuenta",
                                                                                  "Beneficiario",
                                                                                  "ID"
                                                                              ]
                                                                          },
                                                                          "pending": false
                                                                      },
                                                                      "frequent": {
                                                                          "value": true,
                                                                          "pending": false
                                                                      },
                                                                      "idNumber": {
                                                                          "value": "Nro. Doc. ID",
                                                                          "pending": false
                                                                      },
                                                                      "account": {
                                                                          "value": "21312312312333333333",
                                                                          "pending": false
                                                                      },
                                                                      "accountType": {
                                                                          "value": "Corriente",
                                                                          "pending": false
                                                                      },
                                                                      "ammount": {
                                                                          "value": 4988,
                                                                          "pending": false
                                                                      },
                                                                      "phoneNumber": {
                                                                          "value": "213123",
                                                                          "pending": false
                                                                      },
                                                                      "email": {
                                                                          "value": "s@gmail.com",
                                                                          "pending": false
                                                                      },
                                                                      "pending": false
                                                                  }
                                                              ]
                                                          },
                                                          "comments": []
                                                      }
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
      route: "/veriflevels/validateRemittance",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(bdResp);
  } catch (error) {
    next(error);
  }
};

export default veriflevelsService;
