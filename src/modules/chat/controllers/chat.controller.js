import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import chatService from "../services/chat.service";

const chatController = {};
const context = "chat Controller";

chatController.sendMessage = (req, res, next) => {
  try {
    logger.info(`[${context}]: Sending service to send message`);
    ObjLog.log(`[${context}]: Sending service to send message`);

    chatService.sendMessage(req, res, next);
  } catch (error) {
    next(error);
  }
};

chatController.getMessages = (req, res, next) => {
  try {
    let email_user = req.params.email_user;
    console.log(email_user)
    logger.info(`[${context}]: Sending service to get all message`);
    ObjLog.log(`[${context}]: Sending service to get all message`);

    chatService.getMessages(req, res, next,email_user);
  } catch (error) {
    next(error);
  }
};


export default chatController;
