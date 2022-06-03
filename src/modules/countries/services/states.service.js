import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import countryStatesRepository from "../repositories/states.pg.repository";

const countryStatesService = {};
const context = "countries States Service";

countryStatesService.getStatesByCountryId = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting Country States By Id ${req.params.id_country}`);
    ObjLog.log(`[${context}]: Getting Country States By Id ${req.params.id_country}`);
    let data = await countryStatesRepository.getStatesByCountryId(req.params.id_country);  
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

export default countryStatesService;
