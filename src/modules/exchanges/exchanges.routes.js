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
  "/pre_exchange",
  // guard.verifyAdmin("/login"),
  exchangesController.startPreExchange
);

exchangesRouter.get(
  "/pre_exchange/:email_user",
  // guard.verifyAdmin("/login"),
  exchangesController.getPreExchangeByUser
);

exchangesRouter.delete(
  "/pre_exchange/:id_pre_exchange",
  // guard.verifyAdmin("/login"),
  exchangesController.cancelPreExchange
);

exchangesRouter.get(
  "/limits",
  // guard.verifyAdmin("/login"),
  exchangesController.getAmountLimits
);

exchangesRouter.get(
  "/",
  // guard.verifyAdmin("/login"),
  exchangesController.getExchangesByUser
);

export default exchangesRouter;