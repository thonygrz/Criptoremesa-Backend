import Router from "express-promise-router";
import resid_countriesController from "./controllers/resid_countries.controller";
import guard from "../../utils/guard";
const resid_countriesRouter = Router();

// IF YOU WERE USING cg/auth/login
resid_countriesRouter.get(
  "/getActive",
  // guard.verifyAdmin("/login"),
  resid_countriesController.getresid_countries
);

resid_countriesRouter.get(
  "/getISOCodeById/:id",
  // guard.verifyAdmin("/login"),
  resid_countriesController.getISOCodeById
);

resid_countriesRouter.get(
  "/isPolExp/:id",
  // guard.verifyAdmin("/login"),
  resid_countriesController.isPolExp
);

export default resid_countriesRouter;
