import Router from "express-promise-router";
import veriflevelsController from "./controllers/veriflevels.controller";
import guard from "../../utils/guard";
const veriflevelsRouter = Router();

// IF YOU WERE USING cg/auth/login
veriflevelsRouter.post(
  "/getActive",
  // guard.verifyAdmin("/login"),
  veriflevelsController.getveriflevels
);

veriflevelsRouter.post(
  "/requestWholesalePartner",
  // guard.verifyAdmin("/login"),
  veriflevelsController.requestWholesalePartner
);

export default veriflevelsRouter;
