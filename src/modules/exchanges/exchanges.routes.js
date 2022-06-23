import Router from "express-promise-router";
import exchangesController from "./controllers/exchanges.controller";
import guard from "../../utils/guard";
const exchangesRouter = Router();

// IF YOU WERE USING cg/auth/login
exchangesRouter.get(
  "/rates/ranges",
  // guard.verifyAdmin("/login"),
  exchangesController.getExchangeRangeRates
);

export default exchangesRouter;
