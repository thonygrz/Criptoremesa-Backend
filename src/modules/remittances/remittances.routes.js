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

remittancesRouter.post(
  "/preRemittance",
  // guard.verifyAdmin("/login"),
  remittancesController.startPreRemittance
);

remittancesRouter.get(
  "/preRemittance/:email_user",
  // guard.verifyAdmin("/login"),
  remittancesController.getPreRemittanceByUser
);

remittancesRouter.delete(
  "/preRemittance/:id_pre_remittance",
  // guard.verifyAdmin("/login"),
  remittancesController.cancelPreRemittance
);

remittancesRouter.get(
  "/lastRemittances/:email_user",
  // guard.verifyAdmin("/login"),
  remittancesController.lastRemittances
);

export default remittancesRouter;
