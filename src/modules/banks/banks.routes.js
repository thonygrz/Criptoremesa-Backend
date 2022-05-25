import Router from "express-promise-router";
import banksController from "./controllers/banks.controller";
import guard from "../../utils/guard";
const banksRouter = Router();

// IF YOU WERE USING cg/auth/login
banksRouter.get(
  "/",
  // guard.verifyAdmin("/login"),
  banksController.getBanks
);

banksRouter.get(
  "/:bank_id",
  // guard.verifyAdmin("/login"),
  banksController.getBankById
);

banksRouter.get(
  "/getBankAccountsById/:id_country/:id_currency",
  // guard.verifyAdmin("/login"),
  banksController.getBankAccountsById
);

banksRouter.get(
  "/getBankAccountById/:id_bank_account",
  // guard.verifyAdmin("/login"),
  banksController.getBankAccountById
);

banksRouter.get(
  "/accounts/:id_pay_method",
  // guard.verifyAdmin("/login"),
  banksController.getBankAccountByPayMethod
);

banksRouter.get(
  "/:id_pay_method",
  // guard.verifyAdmin("/login"),
  banksController.getBanksByPayMethod
);

export default banksRouter;
