import Router from "express-promise-router";
import currenciesController from "./controllers/currencies.controller";
import guard from "../../utils/guard";
const currenciesRouter = Router();

// IF YOU WERE USING cg/auth/login
currenciesRouter.get(
  "/",
  // guard.verifyAdmin("/login"),
  currenciesController.getCurrenciesByCountry
);

export default currenciesRouter;
