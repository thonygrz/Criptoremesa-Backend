import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import cryptomilesPGRepository from "../repositories/cryptomiles.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import {env,ENVIROMENTS} from '../../../utils/enviroment'

const cryptomilesService = {};
const context = "cryptomiles Service";

// Se declara el objeto de Log
const logConst = {
  is_auth: null,
  success: true,
  failed: false,
  ip: null,
  country: null,
  route: null,
  session: null
};

cryptomilesService.insertCryptomile = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Inserting Cryptomile`);
    ObjLog.log(`[${context}]: Inserting Cryptomile`);
    let data = await cryptomilesPGRepository.insertCryptomile(req.body);
    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

cryptomilesService.getCryptomiles = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting Cryptomiles`);
    ObjLog.log(`[${context}]: Getting Cryptomiles`);
    let data = await cryptomilesPGRepository.getCryptomiles(req.params.email_user);
    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

cryptomilesService.deactivateCryptomiles = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Inserting Cryptomile`);
    ObjLog.log(`[${context}]: Inserting Cryptomile`);
    let data = await cryptomilesPGRepository.deactivateCryptomiles(req.params.email_user);
    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

cryptomilesService.activateCryptomiles = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Inserting Cryptomile`);
    ObjLog.log(`[${context}]: Inserting Cryptomile`);
    data = await cryptomilesPGRepository.activateCryptomiles(req.params.email_user);
    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

cryptomilesService.getAllCryptomiles = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting all Cryptomiles`);
    ObjLog.log(`[${context}]: Getting all Cryptomiles`);
    let data = await cryptomilesPGRepository.getAllCryptomiles({
                                                            email_user: req.params.email_user,
                                                            ...req.query
                                                          });
    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

export default cryptomilesService;