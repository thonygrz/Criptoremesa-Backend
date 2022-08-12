import Router from "express-promise-router";
import wholesale_partnersController from "./controllers/wholesale_partners.controller";
import guard from "../../utils/guard";
const wholesale_partnersRouter = Router();
import {env} from '../../utils/enviroment'
import path from 'path'
import multer from "multer";
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, env.FILES_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({ storage: storage })

// IF YOU WERE USING cg/auth/login
wholesale_partnersRouter.post(
  "/info/:email_user",
  // guard.verifyAdmin("/login"),
  upload.single('logo'),
  wholesale_partnersController.insertWholesalePartnerInfo
);

wholesale_partnersRouter.get(
  "/:slug",
  // guard.verifyAdmin("/login"),
  wholesale_partnersController.getWholesalePartnerInfo
);

wholesale_partnersRouter.get(
  "/rates",
  // guard.verifyAdmin("/login"),
  wholesale_partnersController.getWholesalePartnerRates
);

export default wholesale_partnersRouter;