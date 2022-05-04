import Router from "express-promise-router";
import reportsController from "./controllers/reports.controller";
import guard from "../../utils/guard";
const reportsRouter = Router();

// IF YOU WERE USING cg/auth/login

reportsRouter.get(
  "/users/:email_user/remittances/totalAmount",
  // guard.verifyAdmin("/login"),
  reportsController.reportAmountSentByBenef
);

export default reportsRouter;