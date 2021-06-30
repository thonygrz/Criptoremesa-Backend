import Router from "express-promise-router";
import authenticationController from "./controllers/authentication.controller";
import guard from "../../utils/guard";
const authenticationRouter = Router();

// IF YOU WERE USING cg/auth/login
// authenticationRouter.post(
//   "/login",
//   guard.verifyAdmin("/login"),
//   authenticationController.login
// );

export default authenticationRouter;
