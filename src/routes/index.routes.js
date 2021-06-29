import Router from "express-promise-router";
import moduleRouter from "../modules/module/module.routes";
const router = Router();

router.use('/module', moduleRouter);

export default router;