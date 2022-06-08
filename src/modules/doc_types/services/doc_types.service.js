import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import doc_typesPGRepository from "../repositories/doc_types.pg.repository";

const doc_typesService = {};
const context = "doc_types Service";

doc_typesService.getDocTypes = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting Doc Types`);
    ObjLog.log(`[${context}]: Getting Doc Types`);
    let data = await doc_typesPGRepository.getDocTypes();
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

doc_typesService.getDocTypeById = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Get Doc Types`);
    ObjLog.log(`[${context}]: Get Doc Types`);
    let data = await doc_typesPGRepository.getDocTypeById(req.params.id_doc_type);
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


export default doc_typesService;
