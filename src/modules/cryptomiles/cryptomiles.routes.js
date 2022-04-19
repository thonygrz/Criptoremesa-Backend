import Router from "express-promise-router";
import cryptomilesController from "./controllers/cryptomiles.controller";
import guard from "../../utils/guard";
const cryptomilesRouter = Router();

// IF YOU WERE USING cg/auth/login

cryptomilesRouter.post(
  "/",
  // guard.verifyAdmin("/login"),
  cryptomilesController.insertCryptomile
);

cryptomilesRouter.get(
  "/:email_user",
  // guard.verifyAdmin("/login"),
  cryptomilesController.getCryptomiles
);


export default cryptomilesRouter;
