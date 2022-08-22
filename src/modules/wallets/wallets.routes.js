import Router from "express-promise-router";
import walletsController from "./controllers/wallets.controller";
import guard from "../../utils/guard";
const walletsRouter = Router();

// IF YOU WERE USING cg/auth/login
walletsRouter.get(
  "/",
  // guard.verifyAdmin("/login"),
  walletsController.getWallets
);

export default walletsRouter;