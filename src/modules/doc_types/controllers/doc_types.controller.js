import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import doc_typesService from "../services/doc_types.service";

const doc_typesController = {};
const context = "doc_types Controller";

doc_typesController.getdoc_types = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get doc_types`);
    ObjLog.log(`[${context}]: Sending service to get doc_types`);

    doc_typesService.getdoc_types(req, res, next);
  } catch (error) {
    next(error);
  }
};

doc_typesController.getdoc_typesClient = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get doc_types`);
    ObjLog.log(`[${context}]: Sending service to get doc_types`);

    doc_typesService.getdoc_typesClient(req, res, next);
  } catch (error) {
    next(error);
  }
};

doc_typesController.getDocTypesLevelOne = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get doc_types by country`);
    ObjLog.log(`[${context}]: Sending service to get doc_types by country`);

    doc_typesService.getDocTypesLevelOne(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default doc_typesController;
