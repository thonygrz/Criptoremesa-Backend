import Router from "express-promise-router";
import ratesController from "./controllers/rates.controller";
import guard from "../../utils/guard";
const ratesRouter = Router();

// IF YOU WERE USING cg/auth/login
ratesRouter.get(
  "/rangeRates",
  // guard.verifyAdmin("/login"),
  ratesController.rangeRates
);

ratesRouter.get(
  "/rateTypes",
  // guard.verifyAdmin("/login"),
  ratesController.rateTypes
);

ratesRouter.get(
  "/userRates/:email_user",
  // guard.verifyAdmin("/login"),
  ratesController.userRates
);

ratesRouter.get(
  "/fullRates/:email_user",
  // guard.verifyAdmin("/login"),
  ratesController.fullRates
);

ratesRouter.get(
  "/promo",
  // guard.verifyAdmin("/login"),
  ratesController.promo
);

export default ratesRouter;
