import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const all_countriesService = {};
const context = "all_countries Service";

all_countriesService.getall_countries = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Searching in DB`);
    ObjLog.log(`[${context}]: Searching in DB`);
    let data
    data = await all_countriesPGRepository.getall_countries();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default all_countriesService;
