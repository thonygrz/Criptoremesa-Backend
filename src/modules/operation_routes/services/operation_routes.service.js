import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import operation_routesRepository from "../repositories/operation_routes.pg.repository";

const operation_routesService = {};
const context = "operation_routes Service";

operation_routesService.getoperation_routes = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting operation_routes`);
    ObjLog.log(`[${context}]: Getting operation_routes`);

    let data = await operation_routesRepository.getoperation_routes();

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

export default operation_routesService;