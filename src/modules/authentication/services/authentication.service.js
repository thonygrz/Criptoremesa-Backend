import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import authenticationPGRepository from "../repositories/authentication.pg.repository";
import auth from "../../../utils/auth";
import axios from "axios";
import { response } from "express";
import { env } from "../../../utils/enviroment";

const authenticationService = {};
const context = "Authentication Service";

authenticationService.login = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending module to verify`);
    ObjLog.log(`[${context}]: Sending module to verify`);

    if (!req.body.captcha) {
      res.status(400).json({
        success: false,
        msg: "Ha ocurrido un error. Por favor completa el captcha",
      });
    } else {
        // Secret key
      const secretKey = env.reCAPTCHA_SECRET_KEY;

      // Verify URL
      const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

      // Make a request to verifyURL
      const body = await axios.get(verifyURL);

      // // If not successful
      if (body.data.success === false) {
        res
          .status(500)
          .json({ success: false, msg: "Falló la verificación del Captcha" });
      }
      else{
          // If successful
        auth.verify(req, res, next);
      }

    }
  } catch (error) {
    next(error);
  }
};

authenticationService.logout = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending module to logout`);
    ObjLog.log(`[${context}]: Sending module to logout`);
    auth.logout(req, res, next);
  } catch (error) {
    next(error);
  }
};

authenticationService.signup = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending module to sign up`);
    ObjLog.log(`[${context}]: Sending module to sign up`);
    auth.signup(req, res, next);
  } catch (error) {
    next(error);
  }
};

authenticationService.protected = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Protected`);
    ObjLog.log(`[${context}]: Protected`);
    let countryResp = null;
    let sess = null;

    if (req.isAuthenticated()) {
      const resp = authenticationPGRepository.getIpInfo(req.clientIp);
      if (resp) countryResp = resp.country_name;
      if (await authenticationPGRepository.getSessionById(req.sessionID))
        sess = req.sessionID;

      const log = {
        is_auth: req.isAuthenticated(),
        success: true,
        failed: false,
        ip: req.clientIp,
        country: countryResp,
        route: "/protected-route",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);

      res.status(200).json({ message: "nice" });
    } else {
      req.session.destroy();

      const resp = authenticationPGRepository.getIpInfo(req.clientIp);
      let countryResp = null;
      sess = null;

      if (resp) countryResp = resp.country_name;

      if (await authenticationPGRepository.getSessionById(req.sessionID))
        sess = req.sessionID;

      const log = {
        is_auth: req.isAuthenticated(),
        success: false,
        failed: true,
        ip: req.clientIp,
        country: countryResp,
        route: "/protected-route",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);

      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

export default authenticationService;
