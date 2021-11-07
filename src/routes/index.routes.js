import Router from "express-promise-router";
import authenticationController from "../modules/authentication/controllers/authentication.controller";
import guard from "../utils/guard";
import usersRouter from "../modules/users/users.routes";
import doc_typesRouter from "../modules/doc_types/doc_types.routes";
import ip_countriesRouter from "../modules/ip_countries/ip_countries.routes";
import resid_countriesRouter from "../modules/resid_countries/resid_countries.routes";
import veriflevelsRouter from "../modules/veriflevels/veriflevels.routes";

const router = Router();

router.post("/login", authenticationController.login);

router.get("/logout", authenticationController.logout);

router.get("/", authenticationController.logout);

router.get(
  "/protected-route",
  // guard.verifyAdmin("/protected-route"),
  authenticationController.protected
);

// IF YOU WANT TO CREATE MORE ROUTES
router.use("/users", usersRouter);
router.use("/ip_countries", ip_countriesRouter);
router.use("/resid_countries", resid_countriesRouter);
router.use("/doc_types", doc_typesRouter);
router.use("/veriflevels", veriflevelsRouter);

export default router;
