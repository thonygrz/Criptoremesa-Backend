import Router from "express-promise-router";
import payMethodsController from "./controllers/payMethods.controller";
import guard from "../../utils/guard";
const payMethodsRouter = Router();

// IF YOU WERE USING cg/auth/login
payMethodsRouter.get(
  "/:idCountry",
  // guard.verifyAdmin("/login"),
  payMethodsController.getPayMethodsByCountry
);



export default payMethodsRouter;
