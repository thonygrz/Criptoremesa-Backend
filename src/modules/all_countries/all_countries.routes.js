import Router from "express-promise-router";
import all_countriesController from "./controllers/all_countries.controller";
import guard from "../../utils/guard";
const all_countriesRouter = Router();

// IF YOU WERE USING cg/auth/login

all_countriesRouter.get(
  "/getActive",
  // guard.verifyAdmin("/login"),
  all_countriesController.getall_countries
);

export default all_countriesRouter;
