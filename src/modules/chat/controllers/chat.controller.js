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


export default chatController;
