import Router from "express-promise-router";
import remittancesController from "./controllers/remittances.controller";
import guard from "../../utils/guard";
const remittancesRouter = Router();

// IF YOU WERE USING cg/auth/login
remittancesRouter.get(
  "/notificationTypes",
  // guard.verifyAdmin("/login"),
  remittancesController.notificationTypes
);

export default remittancesRouter;
