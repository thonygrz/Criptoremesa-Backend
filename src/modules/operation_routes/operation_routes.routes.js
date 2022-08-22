import Router from "express-promise-router";
import operation_routesController from "./controllers/operation_routes.controller";
import guard from "../../utils/guard";
const operation_routesRouter = Router();

// IF YOU WERE USING cg/auth/login
operation_routesRouter.get(
  "/",
  // guard.verifyAdmin("/login"),
  operation_routesController.getoperation_routes
);

export default operation_routesRouter;
