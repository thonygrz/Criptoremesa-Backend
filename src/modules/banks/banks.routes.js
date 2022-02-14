import Router from "express-promise-router";
import currenciesController from "./controllers/banks.controller";
import guard from "../../utils/guard";
const currenciesRouter = Router();

// IF YOU WERE USING cg/auth/login
currenciesRouter.get(
  "/",
  // guard.verifyAdmin("/login"),
  currenciesController.getBanks
);

currenciesRouter.get(
  "/:bank_id",
  // guard.verifyAdmin("/login"),
  currenciesController.getBankById
);

currenciesRouter.get(
  "/getBankAccountsById",
  // guard.verifyAdmin("/login"),
  currenciesController.getBankAccountsById
);


export default currenciesRouter;
