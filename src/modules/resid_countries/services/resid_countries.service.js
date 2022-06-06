import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import resid_countriesPGRepository from "../repositories/resid_countries.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const resid_countriesService = {};
const context = "resid_countries Service";

resid_countriesService.getresid_countries = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting resid countries`);
    ObjLog.log(`[${context}]: Getting resid countries`);

    let data = await resid_countriesPGRepository.getresid_countries();
    
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

resid_countriesService.getISOCodeById = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting ISO code by id`);
    ObjLog.log(`[${context}]: Getting ISO code by id`);

    let data = await resid_countriesPGRepository.getISOCodeById(req.params.id);

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

resid_countriesService.isPolExp = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Searching if it's politicaly exposed`);
    ObjLog.log(`[${context}]: Searching if it's politicaly exposed`);

    let data = await resid_countriesPGRepository.isPolExp(req.params.id);

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

export default resid_countriesService;
