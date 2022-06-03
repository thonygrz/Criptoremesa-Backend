import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import all_countriesPGRepository from "../../all_countries/repositories/all_countries.pg.repository";

const all_countriesService = {};
const context = "all_countries Service";

all_countriesService.getall_countries = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);
    let data = await all_countriesPGRepository.getall_countries();
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

export default all_countriesService;