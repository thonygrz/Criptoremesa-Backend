import Router from "express-promise-router";
import destinyCountriesController from "./controllers/destiny_countries.controller";
import countryStatesController from "./controllers/states.controller";
import guard from "../../utils/guard";
const countriesRouter = Router();

// IF YOU WERE USING cg/auth/login
countriesRouter.get(
  "/destiny",
  // guard.verifyAdmin("/login"),
  destinyCountriesController.getDestinyCountries
);

countriesRouter.get(
  "/states/:id_country",
  // guard.verifyAdmin("/login"),
  countryStatesController.getStatesByCountryId
);




export default countriesRouter;
