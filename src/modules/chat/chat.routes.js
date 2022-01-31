import Router from "express-promise-router";
import chatController from "./controllers/chat.controller";
import guard from "../../utils/guard";
const chatRouter = Router();

// IF YOU WERE USING cg/auth/login
chatRouter.post(
  "/sendMessage",
  // guard.verifyAdmin("/login"),
  chatController.sendMessage
);

export default chatRouter;
