import Router from "express-promise-router";
import guard from "../../utils/guard";
import beneficiariesController from "./controllers/beneficiaries.controller";
const beneficiariesRouter = Router();


beneficiariesRouter.get(
  "/frequentBeneficiaries",
  // guard.verifyAdmin("/login"),
  beneficiariesController.getUserFrequentBeneficiaries
);

export default beneficiariesRouter;
