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

cryptomilesRouter.put(
  "/deactivate/:email_user",
  // guard.verifyAdmin("/login"),
  cryptomilesController.deactivateCryptomiles
);

cryptomilesRouter.put(
  "/activate/:email_user",
  // guard.verifyAdmin("/login"),
  cryptomilesController.activateCryptomiles
);

cryptomilesRouter.get(
  "/:email_user/all",
  // guard.verifyAdmin("/login"),
  cryptomilesController.getAllCryptomiles
);

export default cryptomilesRouter;
