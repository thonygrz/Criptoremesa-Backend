import Router from "express-promise-router";
import guard from "../../utils/guard";
import remittanceController from "./controllers/remittance.controller";
const remittanceRouter = Router();


remittanceRouter.get(
  "/:email_user",
  // guard.verifyAdmin("/login"),
  remittanceController.getRemittances
);


export default remittanceRouter;
