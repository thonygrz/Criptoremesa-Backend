import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import usersService from "../services/users.service";

const usersController = {};
const context = "users Controller";

//AUTENTICACION CON PASSPORT
usersController.getusers = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get users`);
    ObjLog.log(`[${context}]: Sending service to get users`);

    usersService.getusers(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.getusersClient = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get users`);
    ObjLog.log(`[${context}]: Sending service to get users`);

    usersService.getusersClient(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.createUser = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to create user`);
    ObjLog.log(`[${context}]: Sending service to create user`);

    usersService.createUser(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.createUserClient = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to create user Client`);
    ObjLog.log(`[${context}]: Sending service to create user Client`);

    usersService.createUserClient(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.createNewClient = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to create new Client`);
    ObjLog.log(`[${context}]: Sending service to create new Client`);

    usersService.createNewClient(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.updateUserClient = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to update user Client`);
    ObjLog.log(`[${context}]: Sending service to update user Client`);

    usersService.updateUserClient(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.updateUserEmployee = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to update user Employee`);
    ObjLog.log(`[${context}]: Sending service to update user Employee`);

    usersService.updateUserEmployee(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.blockClient = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to update user Client`);
    ObjLog.log(`[${context}]: Sending service to update user Client`);

    usersService.blockClient(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.blockEmployee = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to update user Client`);
    ObjLog.log(`[${context}]: Sending service to update user Client`);

    usersService.blockEmployee(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.unblockClient = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to update user Client`);
    ObjLog.log(`[${context}]: Sending service to update user Client`);

    usersService.unblockClient(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.unblockEmployee = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to update user Client`);
    ObjLog.log(`[${context}]: Sending service to update user Client`);

    usersService.unblockEmployee(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.getusersClientById = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to update user Client`);
    ObjLog.log(`[${context}]: Sending service to update user Client`);

    usersService.getusersClientById(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.getusersEmployeeById = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get employee`);
    ObjLog.log(`[${context}]: Sending service to get employee`);

    usersService.getusersEmployeeById(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.getEmployeePhonesById = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get employee phones`);
    ObjLog.log(`[${context}]: Sending service to get employee phonest`);

    usersService.getEmployeePhonesById(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.getClientPhonesById = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get employee phones`);
    ObjLog.log(`[${context}]: Sending service to get employee phonest`);

    usersService.getClientPhonesById(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.getDepartmentsByUserId = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get departments`);
    ObjLog.log(`[${context}]: Sending service to get departments`);

    usersService.getDepartmentsByUserId(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.getDataFromSheetsClients = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get users`);
    ObjLog.log(`[${context}]: Sending service to get users`);

    usersService.getDataFromSheetsClients(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.getDataFromSheetsEmployees = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get users`);
    ObjLog.log(`[${context}]: Sending service to get users`);

    usersService.getDataFromSheetsEmployees(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.approveLevelCero = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to approve level zero`);
    ObjLog.log(`[${context}]: Sending service to approve level zero`);

    usersService.approveLevelCero(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.files = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to download file`);
    ObjLog.log(`[${context}]: Sending service to download file`);

    usersService.files(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.requestLevelOne1stQ = (req, res, next) => {
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
        route: "/requestLevelOne1stQ",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);
  
      res.status(401).json({ message: "Unauthorized" });
    }
    logger.info(`[${context}]: Sending service to request level one`);
    ObjLog.log(`[${context}]: Sending service to request level one`);

    usersService.requestLevelOne1stQ(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.requestLevelOne2ndQ = (req, res, next) => {
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
        route: "/requestLevelOne2ndQ",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);
  
      res.status(401).json({ message: "Unauthorized" });
    }
    logger.info(`[${context}]: Sending service to request level one`);
    ObjLog.log(`[${context}]: Sending service to request level one`);

    usersService.requestLevelOne2ndQ(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.requestLevelOne3rdQ = (req, res, next) => {
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
        route: "/requestLevelOne3rdQ",
        session: sess,
      };
    logger.info(`[${context}]: Sending service to request level one`);
    ObjLog.log(`[${context}]: Sending service to request level one`);

    usersService.requestLevelOne3rdQ(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.forgotPassword = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to verify email`);
    ObjLog.log(`[${context}]: Sending service to verify email`);
    usersService.forgotPassword(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.newPassword = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to change password`);
    ObjLog.log(`[${context}]: Sending service to change password`);
    usersService.newPassword(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.getusersClientByEmail = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to get Client`);
    ObjLog.log(`[${context}]: Sending service to get Client`);

    usersService.getusersClientByEmail(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.sendVerificationCodeByEmail = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to verify email`);
    ObjLog.log(`[${context}]: Sending service to verify email`);
    usersService.sendVerificationCodeByEmail(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.approveLevelOne = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to approve level one`);
    ObjLog.log(`[${context}]: Sending service to approve level one`);

    usersService.approveLevelOne(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.getLevelQuestions = (req, res, next) => {
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
        route: "/getLevelQuestions",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);
  
      res.status(401).json({ message: "Unauthorized" });
    }
    logger.info(`[${context}]: Sending service to get questions`);
    ObjLog.log(`[${context}]: Sending service to get questions`);

    usersService.getLevelQuestions(req, res, next);
  } catch (error) {
    next(error);
  }
};

usersController.requestLevelTwo = (req, res, next) => {
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
        route: "/getActirequestLevelTwove",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);
  
      res.status(401).json({ message: "Unauthorized" });
    }
    logger.info(`[${context}]: Sending service to request level two`);
    ObjLog.log(`[${context}]: Sending service to request level two`);

    usersService.requestLevelTwo(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default usersController;
