import Router from "express-promise-router";
import reportsController from "./controllers/reports.controller";
import guard from "../../utils/guard";
const reportsRouter = Router();

// IF YOU WERE USING cg/auth/login

reportsRouter.get(
  "/usersWithMostTransactionsByRangeTimeAndCountry",
  // guard.verifyAdmin("/login"),
  reportsController.usersWithMostTransactionsByRangeTimeAndCountry
);

reportsRouter.get(
  "/usersWithMoneyTransferedByRangeTimeAndCountry",
  // guard.verifyAdmin("/login"),
  reportsController.usersWithMoneyTransferedByRangeTimeAndCountry
);

export default reportsRouter;
