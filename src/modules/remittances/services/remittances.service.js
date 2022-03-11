import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import remittancesPGRepository from "../repositories/remittances.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
import redisClient from "../../../utils/redis";
import { notifyChanges } from "../../../modules/sockets/sockets.coordinator";
import {join} from 'path'
import fs from 'fs'
import formidable from "formidable";
import axios from 'axios'

const remittancesService = {};
const context = "remittances Service";
let events = {};
const logConst = {
  is_auth: undefined,
  success: true,
  failed: false,
  ip: undefined,
  country: undefined,
  route: "/remittance/",
  session: null,
};

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

remittancesService.notificationTypes = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await remittancesPGRepository.notificationTypes();
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
      route: "/remittances/notificationTypes",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

remittancesService.getRemittances = async (req, res, next,userEmail) => {
  try {
     let log  = logConst;
     log.route = log.route + ':email_user'; 
     log.is_auth = req.isAuthenticated()
     log.ip = req.connection.remoteAddress
     const ipInfo = await authenticationPGRepository.getIpInfo(req.connection.remoteAddress);
     if (ipInfo) log.country = ipInfo.country_name;
     if (await authenticationPGRepository.getSessionById(req.sessionID)) log.session = req.sessionID;
     if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION){
        log.success = false;
        log.failed = true;
        await authenticationPGRepository.insertLogMsg(log);
        res.status(401).json({ message: "Unauthorized" });
     }else{
        await authenticationPGRepository.insertLogMsg(log);
        logger.info(`[${context}]: Get ${userEmail} remittances`);
        ObjLog.log(`[${context}]: Get ${userEmail} remittances`);
        let data = await remittancesPGRepository.getRemittances(userEmail);
        res.status(200).json(data);
     }
  } catch (error) {
    next(error);
  }
};

remittancesService.limitationsByCodPub = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await remittancesPGRepository.limitationsByCodPub(req.params.cust_cr_cod_pub);
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
      route: "/remittances/limitationsByCodPub",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

remittancesService.startRemittance = async (req, res, next) => {
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
      route: "/remittances/",
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
    let numbers = []

    form.parse(req, async function (err, fields, files) {
      console.log("fileError ", fileError);
      console.log("files ", files);
      console.log("fields ", fields);

      console.log('JSONNN: ',JSON.parse(fields.remittance))

      Object.values(files).forEach((f) => {
        if (
          f.type === "image/png" ||
          f.type === "image/jpg" ||
          f.type === "image/jpeg" ||
          f.type === "image/gif" ||
          f.type === "application/pdf" 
        ) {

          let exists = true
          let pathName
          while (exists){
              let number = between(10000,99999);
              pathName = join(env.FILES_DIR,`/remittance-${JSON.parse(fields.remittance).email_user}_${number}_${f.name}`)
              if (!fs.existsSync(pathName)){
                  exists = false
                  numbers.push(number)
                  fs.rename(
                    f.path,
                    form.uploadDir + `/remittance-${JSON.parse(fields.remittance).email_user}_${number}_${f.name}`,
                    (error) => {
                      if (error) {
                        console.log("error dentro del rename: ", error);
                        next(error);
                      }
                    }
                  );
              }
          }
        }
      });
      try {
        if (!fileError) {
          let remittance = JSON.parse(fields.remittance)

          Object.values(files).forEach((f,i) => {
            if (
              f.type === "image/png" ||
              f.type === "image/jpg" ||
              f.type === "image/jpeg" ||
              f.type === "image/gif" ||
              f.type === "application/pdf" 
            ) {
              remittance.captures[i].path = form.uploadDir + `/remittance-${JSON.parse(fields.remittance).email_user}_${numbers[i]}_${f.name}`
            }
          });

          let fullRateFromAPI = await axios.get(`https://api.currencyfreaks.com/latest?apikey=33d33c1a7a7748d496d548f9a1973ae6&symbols=${remittance.countryCurrency.isoCode}`);

          console.log('fullRateFromAPI: ',fullRateFromAPI)

          let rateFromAPI = fullRateFromAPI.data.rates[remittance.countryCurrency.isoCode]
          rateFromAPI = parseFloat(rateFromAPI)

          remittance.totalDollarOriginRemittance = parseFloat((totalOriginRemittance / rateFromAPI).toFixed(2));

          console.log('SE ENVIA ESTO AL REPO', remittance)

          let data = await remittancesPGRepository.startRemittance(remittance);

          if (data.message = 'Remittance started') {
            console.log('LO QUE SE VA A PASAR A REDIS: ',data.id_pre_remittance)
            redisClient.get(data.id_pre_remittance, function (err, reply) {
              // reply is null when the key is missing
              console.log("Redis reply: ", parseInt(reply));
              clearTimeout(parseInt(reply))
            });
          }
      
          res.status(200).json(data);
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
};

function waitingPreRemittance(id_pre_remittance) {
  const timmy = setTimeout(async () => {
    let resp = await remittancesPGRepository.expiredPreRemittance(id_pre_remittance);
    if (resp.email_user)
      notifyChanges('expired_remittance', resp);
  }, 300000);
  console.log('TIMMY: ',timmy)
  console.log('JSON.stringify(obj): ',timmy[Symbol.toPrimitive]())
  redisClient.set(id_pre_remittance.toString(), timmy[Symbol.toPrimitive]());
}

remittancesService.startPreRemittance = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await remittancesPGRepository.startPreRemittance(req.body);
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
      route: "/remittances/preRemittance",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    if (data.message === 'Pre-remittance succesfully inserted.'){

      waitingPreRemittance(data.id_pre_remittance);

    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

remittancesService.getPreRemittanceByUser = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await remittancesPGRepository.getPreRemittanceByUser(req.params.email_user);
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
      route: "/remittances/pre-remittance",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

remittancesService.cancelPreRemittance = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await remittancesPGRepository.cancelPreRemittance(req.params.id_pre_remittance);
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
      route: "/remittances/preRemittance",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);
    console.log('LO QUE SE VA A PASAR A REDIS: ',req.params.id_pre_remittance)
    console.log('LO QUE SE VA A PASAR A REDIS to string: ',req.params.id_pre_remittance.toString())
    redisClient.get(req.params.id_pre_remittance, function (err, reply) {
      // reply is null when the key is missing
      console.log("Redis reply CANCELLED: ", reply);
      clearTimeout(reply)
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default remittancesService;
export { events };
