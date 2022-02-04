import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import countryStatesService from "../services/states.service";

const countryStatesController = {};
const context = "country States Controller";

//AUTENTICACION CON PASSPORT
countryStatesController.getStatesByCountryId = (req, res, next) => {
  try {
    let countryId = req.params.id_country
    logger.info(`[${context}]: Sending service to get country States by id ${countryId}`);
    ObjLog.log(`[${context}]: Sending service to get country States by id ${countryId}`);

    countryStatesService.getStatesByCountryId(req, res, next,countryId);
  } catch (error) {
    next(error);
  }
};

export default countryStatesController;
