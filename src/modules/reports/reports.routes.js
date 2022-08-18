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
  "/users/:email_user/frequentDestinations/top",
  // guard.verifyAdmin("/login"),
  reportsController.reportTopFrequentDestinations
);

reportsRouter.get(
  "/users/:email_user/remittances",
  // guard.verifyAdmin("/login"),
  reportsController.reportRemittancesByStatus
);

reportsRouter.get(
  "/users/:email_user/remittances/month",
  // guard.verifyAdmin("/login"),
  reportsController.reportRemittancesByMonth
);

reportsRouter.get(
  "/users/:email_user/rates",
  // guard.verifyAdmin("/login"),
  reportsController.reportRatesTakenAdvantageOf
);

reportsRouter.get(
  "/wholesale_partners",
  // guard.verifyAdmin("/login"),
  reportsController.wholesalePartnersReports
);

export default reportsRouter;
