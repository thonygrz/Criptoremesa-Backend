import Router from "express-promise-router";
import transbankController from "./controllers/transbank.controller";
import guard from "../../utils/guard";
const transbankRouter = Router();

// IF YOU WERE USING cg/auth/login
transbankRouter.get(
  "/webpayplus/create",
  // guard.verifyAdmin("/login"),
  transbankController.getWebpayTransaction
);

transbankRouter.get(
  "/webpayplus/confirm",
  // guard.verifyAdmin("/login"),
  transbankController.confirmWebpayTransaction
);

export default transbankRouter;