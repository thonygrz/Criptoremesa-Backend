import Router from "express-promise-router";
import ratesController from "./controllers/rates.controller";
import guard from "../../utils/guard";
const ratesRouter = Router();

// IF YOU WERE USING cg/auth/login
ratesRouter.get(
  "/getRangeRates",
  // guard.verifyAdmin("/login"),
  ratesController.getRangeRates
);

export default ratesRouter;
