import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import doc_typesService from "../services/doc_types.service";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";

const doc_typesController = {};
const context = "doc_types Controller";

doc_typesController.getDocTypes = (req, res, next) => {
  try {
    if (!req.isAuthenticated()){
      req.session.destroy();

      const resp = authenticationPGRepository.getIpInfo(
        req.connection.remoteAddress
      );
      let countryResp = null;
      sess = null;

      if (resp) countryResp = resp.country_name;

      if (await authenticationPGRepository.getSessionById(req.sessionID))
        sess = req.sessionID;

      const log = {
        is_auth: req.isAuthenticated(),
        success: false,
        failed: true,
        ip: req.connection.remoteAddress,
        country: countryResp,
        route: "/getActive",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);

      res.status(401).json({ message: "Unauthorized" });
    }
    logger.info(`[${context}]: Sending service to get doc_types`);
    ObjLog.log(`[${context}]: Sending service to get doc_types`);

    doc_typesService.getDocTypes(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default doc_typesController;
