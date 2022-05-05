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

reportsRouter.get(
  "/users/:email_user/currencies/totalAmount",
  // guard.verifyAdmin("/login"),
  reportsController.reportAmountSentByCurrency
);

reportsRouter.get(
  "/users/:email_user/frequentBeneficiaries/top",
  // guard.verifyAdmin("/login"),
  reportsController.reportTopFrequentBeneficiaries
);

reportsRouter.get(
  "/users/:email_user/frequentDestinys/top",
  // guard.verifyAdmin("/login"),
  reportsController.reportTopFrequentDestinys
);

export default reportsRouter;
