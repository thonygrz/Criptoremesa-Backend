import Router from "express-promise-router";
import authenticationController from "../modules/authentication/controllers/authentication.controller";
import guard from "../utils/guard";
import usersRouter from "../modules/users/users.routes";

const router = Router();

router.post("/login", authenticationController.login);

router.get("/logout", authenticationController.logout);

router.post("/signup", authenticationController.signup);

router.get("/", authenticationController.logout);

router.get(
  "/protected-route",
  // guard.verifyAdmin("/protected-route"),
  authenticationController.protected
);

// IF YOU WANT TO CREATE MORE ROUTES
router.use("/users", usersRouter);

export default router;
