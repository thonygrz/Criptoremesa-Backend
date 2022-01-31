import Router from "express-promise-router";
import doc_typesController from "./controllers/doc_types.controller";
import guard from "../../utils/guard";
const doc_typesRouter = Router();

// IF YOU WERE USING cg/auth/login

doc_typesRouter.get(
  "/getActive",
  // guard.verifyAdmin("/login"),
  doc_typesController.getDocTypes
);

doc_typesRouter.get(
  "/:id_doc_type",
  // guard.verifyAdmin("/login"),
  doc_typesController.getDocTypeById
);

export default doc_typesRouter;
