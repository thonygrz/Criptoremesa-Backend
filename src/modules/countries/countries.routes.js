import Router from "express-promise-router";
import countriesController from "./controllers/countries.controller";
import countryStatesController from "./controllers/states.controller";
import guard from "../../utils/guard";
const countriesRouter = Router();

// IF YOU WERE USING cg/auth/login
countriesRouter.get(
  "/destiny",
  // guard.verifyAdmin("/login"),
  countriesController.getDestinyCountries
);

countriesRouter.get(
  "/states/:id_country",
  // guard.verifyAdmin("/login"),
  countryStatesController.getStatesByCountryId
);

countriesRouter.get(
  "/countriesCurrencies",
  // guard.verifyAdmin("/login"),
  countriesController.countriesCurrencies
);

export default countriesRouter;