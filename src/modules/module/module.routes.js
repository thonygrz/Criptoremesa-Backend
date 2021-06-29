import Router from "express-promise-router";
import moduleController from "./controllers/module.controller";
const moduleRouter = Router();

moduleRouter.use('/', moduleController.get);

export default moduleRouter;