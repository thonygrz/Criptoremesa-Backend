import Router from "express-promise-router";
import ip_countriesController from "./controllers/ip_countries.controller";
import guard from "../../utils/guard";
const ip_countriesRouter = Router();

// IF YOU WERE USING cg/auth/login
ip_countriesRouter.get(
  "/getActive",
  // guard.verifyAdmin("/login"),
  ip_countriesController.getip_countries
);

ip_countriesRouter.get(
  "/getIdByName/:id",
  // guard.verifyAdmin("/login"),
  ip_countriesController.getid_by_name
);

ip_countriesRouter.get(
  "/getActiveClient",
  // guard.verifyAdmin("/login"),
  ip_countriesController.getip_countriesClient
);

ip_countriesRouter.get(
  "/getIdByNameClient/:id",
  // guard.verifyAdmin("/login"),
  ip_countriesController.getid_by_nameClient
);

export default ip_countriesRouter;
