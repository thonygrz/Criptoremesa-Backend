import Router from "express-promise-router";
import payMethodsController from "./controllers/payMethods.controller";
import guard from "../../utils/guard";
const payMethodsRouter = Router();

// IF YOU WERE USING cg/auth/login
payMethodsRouter.get(
  "/by_country/:country_id",
  // guard.verifyAdmin("/login"),
  payMethodsController.getPayMethodsByCountry
);

payMethodsRouter.get(
  "/:pay_method_id",
  // guard.verifyAdmin("/login"),
  payMethodsController.getPayMethodById
);

payMethodsRouter.get(
  "/depositMethodsByBank/:id_bank",
  // guard.verifyAdmin("/login"),
  payMethodsController.depositMethodsByBank
);

export default payMethodsRouter;
