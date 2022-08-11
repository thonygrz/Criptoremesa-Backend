import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import wholesale_partnersService from "../services/wholesale_partners.service";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import { env, ENVIROMENTS } from "../../../utils/enviroment";

const wholesale_partnersController = {};
const context = "wholesale_partners Controller";

// declaring log object
const logConst = {
  is_auth: null,
  success: true,
  failed: false,
  ip: null,
  country: null,
  route: null,
  session: null,
};

wholesale_partnersController.insertWholesalePartnerInfo = async (
  req,
  res,
  next
) => {
  try {
    console.log("🚀 ~ req.file", req.file)
    // filling log object info
    let log = logConst;

    log.is_auth = req.isAuthenticated();
    log.ip = req.header("Client-Ip");
    log.route = req.method + " " + req.originalUrl;
    const resp = await authenticationPGRepository.getIpInfo(
      req.header("Client-Ip")
    );
    if (resp)
      log.country = resp.country_name
        ? resp.country_name
        : "Probably Localhost";
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      log.session = req.sessionID;

    // protecting route in production but not in development
    if (!req.isAuthenticated() && env.ENVIROMENT === ENVIROMENTS.PRODUCTION) {
      req.session.destroy();
      log.success = false;
      log.failed = true;
      log.params = req.params;
      log.query = req.query;
      log.body = req.body;
      log.status = 401;
      log.response = { message: "Unauthorized" };
      await authenticationPGRepository.insertLogMsg(log);
      res.status(401).json({ message: "Unauthorized" });
    } else if (!(
                  req.file.mimetype === "image/png" ||
                  req.file.mimetype === "image/jpg" ||
                  req.file.mimetype === "image/jpeg" ||
                  req.file.mimetype === "application/pdf"
                )
              ) {
      log.success = false;
      log.failed = true;
      log.params = req.params;
      log.query = req.query;
      log.body = req.body;
      log.status = 403;
      log.response = { message: "Invalid file format." };
      await authenticationPGRepository.insertLogMsg(log);
      res.status(log.status).json({ message: "Invalid file format." });
    }
    else if (
      req.file.size > 5 * 1024 * 1024 
    ) {
      
      log.success = false;
      log.failed = true;
      log.params = req.params;
      log.query = req.query;
      log.body = req.body;
      log.status = 403;
      log.response = { message: "The file exceeded the maximum allowed size." };
      await authenticationPGRepository.insertLogMsg(log);
      res.status(log.status).json({ message: "The file exceeded the maximum allowed size." });
    }
    else {
      // calling service
      logger.info(
        `[${context}]: Sending service to insert wholesale_partner info`
      );
      ObjLog.log(
        `[${context}]: Sending service to insert wholesale_partner info`
      );

      let finalResp = await wholesale_partnersService.insertWholesalePartnerInfo(
        req,
        res,
        next
      );

      if (finalResp) {
        //logging on DB
        log.success = finalResp.success;
        log.failed = finalResp.failed;
        log.params = req.params;
        log.query = req.query;
        log.body = req.body;
        log.status = finalResp.status;
        log.response = finalResp.data;
        await authenticationPGRepository.insertLogMsg(log);

        //sendind response to FE
        res.status(finalResp.status).json(finalResp.data);
      }
    }
  } catch (error) {
    next(error);
  }
};

export default wholesale_partnersController;