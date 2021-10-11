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

veriflevelsRouter.get(
  "/notifications/:email_user",
  // guard.verifyAdmin("/login"),
  veriflevelsController.notifications
);

veriflevelsRouter.delete(
  "/notifications/:id",
  // guard.verifyAdmin("/login"),
  veriflevelsController.deactivateNotification
);

veriflevelsRouter.patch(
  "/notifications/:id",
  // guard.verifyAdmin("/login"),
  veriflevelsController.readNotification
);


export default veriflevelsRouter;
