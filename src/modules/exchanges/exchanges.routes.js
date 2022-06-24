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

exchangesRouter.get(
  "/rates",
  // guard.verifyAdmin("/login"),
  exchangesController.getExchangeRates
);

exchangesRouter.post(
  "/",
  // guard.verifyAdmin("/login"),
  exchangesController.insertExchange
);

exchangesRouter.post(
  "/preExchange",
  // guard.verifyAdmin("/login"),
  exchangesController.startPreExchange
);

exchangesRouter.get(
  "/preExchange/:email_user",
  // guard.verifyAdmin("/login"),
  exchangesController.getPreExchangeByUser
);

exchangesRouter.delete(
  "/preExchange/:id_pre_exchange",
  // guard.verifyAdmin("/login"),
  exchangesController.cancelPreExchange
);

export default exchangesRouter;