import Router from "express-promise-router";
import guard from "../../utils/guard";
import beneficiariesController from "./controllers/beneficiaries.controller";
const beneficiariesRouter = Router();


beneficiariesRouter.get(
  "/frequentBeneficiaries",
  // guard.verifyAdmin("/login"),
  beneficiariesController.getUserFrequentBeneficiaries
);

beneficiariesRouter.post(
  "/frequentBeneficiaries",
  // guard.verifyAdmin("/login"),
  beneficiariesController.createFrequentBeneficiary
);

beneficiariesRouter.delete(
  "/frequentBeneficiaries/:beneficiaryId",
  // guard.verifyAdmin("/login"),
  beneficiariesController.deleteFrequentBeneficiary
);

beneficiariesRouter.put(
  "/frequentBeneficiaries/:beneficiaryId",
  // guard.verifyAdmin("/login"),
  beneficiariesController.updateFrequentBeneficiary
);

export default beneficiariesRouter;
