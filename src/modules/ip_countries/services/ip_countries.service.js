import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import ip_countriesPGRepository from "../repositories/ip_countries.pg.repository";

const ip_countriesService = {};
const context = "ip_countries Service";

ip_countriesService.getid_by_name = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get ip_countries`);
    ObjLog.log(`[${context}]: Sending service to get ip_countries`);
    let data = await ip_countriesPGRepository.getid_by_name(req.params.id);
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

ip_countriesService.getip_countries = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get ip_countries`);
    ObjLog.log(`[${context}]: Sending service to get ip_countries`);
    let data = await ip_countriesPGRepository.getip_countries();
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

export default ip_countriesService;
