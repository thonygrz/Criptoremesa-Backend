import Router from "express-promise-router";
import doc_typesController from "./controllers/doc_types.controller";
import guard from "../../utils/guard";
const doc_typesRouter = Router();

// IF YOU WERE USING cg/auth/login
doc_typesRouter.get(
  "/getActive",
  // guard.verifyAdmin("/login"),
  doc_typesController.getdoc_types
);

doc_typesRouter.get(
  "/getActiveClient",
  // guard.verifyAdmin("/login"),
  doc_typesController.getdoc_typesClient
);

doc_typesRouter.get(
  "/getDocTypesLevelOne/:id",
  // guard.verifyAdmin("/login"),
  doc_typesController.getDocTypesLevelOne
);

export default doc_typesRouter;
