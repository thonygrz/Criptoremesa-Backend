import Router from "express-promise-router";
import chatController from "./controllers/chat.controller";
import guard from "../../utils/guard";
const chatRouter = Router();

// IF YOU WERE USING cg/auth/login
chatRouter.post(
  "/message",
  // guard.verifyAdmin("/login"),
  chatController.sendMessage
);

chatRouter.get(
  "/message/:email_user",
  // guard.verifyAdmin("/login"),
  chatController.getMessages
);

export default chatRouter;
