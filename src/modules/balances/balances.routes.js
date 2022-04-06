import Router from "express-promise-router";
import balancesController from "./controllers/balances.controller";
import guard from "../../utils/guard";
const balancesRouter = Router();

// IF YOU WERE USING cg/auth/login

balancesRouter.get(
  "/",
  // guard.verifyAdmin("/login"),
  balancesController.getBalances
);

export default balancesRouter;
