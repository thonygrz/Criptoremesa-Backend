import Router from "express-promise-router";
import remittancesController from "./controllers/remittances.controller";
import guard from "../../utils/guard";
const remittancesRouter = Router();

// IF YOU WERE USING cg/auth/login
remittancesRouter.get(
  "/notificationTypes",
  // guard.verifyAdmin("/login"),
  remittancesController.notificationTypes
);

remittancesRouter.get(
  "/hola",
  // guard.verifyAdmin("/login"),
  remittancesController.countriesCurrencies
);

remittancesRouter.get(
  "/:email_user",
  // guard.verifyAdmin("/login"),
  remittancesController.getRemittances
);

remittancesRouter.get(
  "/limitationsByCodPub/:cust_cr_cod_pub",
  // guard.verifyAdmin("/login"),
  remittancesController.limitationsByCodPub
);

remittancesRouter.post(
  "/",
  // guard.verifyAdmin("/login"),
  remittancesController.startRemittance
);



export default remittancesRouter;
