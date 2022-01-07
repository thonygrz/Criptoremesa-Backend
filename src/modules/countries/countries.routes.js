import Router from "express-promise-router";
import destinyCountriesController from "./controllers/destiny_countries.controller";
import guard from "../../utils/guard";
const destinyCountriesRouter = Router();

// IF YOU WERE USING cg/auth/login
destinyCountriesRouter.get(
  "/destiny",
  // guard.verifyAdmin("/login"),
  destinyCountriesController.getDestinyCountries
);



export default destinyCountriesRouter;
