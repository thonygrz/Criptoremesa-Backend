import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { logger } from "../utils/logger";
import ObjLog from "../utils/ObjLog";
import { env } from "../utils/enviroment";
import routerIndex from "../routes/index.routes";
import passport from "passport";
import cookieParser from "cookie-parser";
import requestIP from "request-ip";
import session from "express-session";
let pgSession = require("connect-pg-simple")(session);
import pgPool from "../db/pg.connection";
import ObjUserSessionData from "../utils/ObjUserSessionData";
import authenticationPGRepository from "../modules/authentication/repositories/authentication.pg.repository";
// import { events } from "../modules/users/services/users.service";

// SETTINGS
const app = express();
app.set("port", env.PORT || 3000);
const opts = {
  multiples: true,
  uploadDir: env.FILES_DIR,
  maxFileSize: 2 * 1024 * 1024,
  keepExtensions: true,
};

// MIDDLEWARES
app.use(morgan("dev", { stream: logger.stream }));
app.use(json());
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(
  cors({
    origin: "http://localhost:8080",
    methods: "GET,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  })
);
app.use(helmet());
app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      tableName: "session_obj", // Use another table-name than the default "session" one
      schemaName: "sec_cust",
    }),
    secret: process.env.COOKIE_SECRET,
    resave: true, // true: inserta el usuario en la sesion despues de hacer login / false: solo lo hace cuando la tabla de sesion está vacía
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // 1 day (1000 ms / sec * 60 sec /1 min * 60 min /1 h * 24 h/1 day)
    // maxAge: 60
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  logger.info(`[Request]: ${req.method} ${req.originalUrl}`);
  ObjLog.log(`[Request]: ${req.method} ${req.originalUrl}`);
  next();
});



// ROUTES
// app.get("/", async (req, res) => {
//   res.status(200).send("Server running");
//   next();
// });

app.use("/cr", routerIndex);

app.use(async (req, res, next) => {

  console.log('middleware despues de passport y todo el auth')

  console.log('middleware')
  console.log(req.session)
  console.log(req.user)
  ObjUserSessionData.set({
    session: {
      session_id: req.session.id,
      cookie: req.session.cookie,
    },
    user: req.user,
  });
  // res.status(200).send("prooving");


  // if (!req.isAuthenticated) {
  //   let response = null;
  //   if (req.user) {
  //     console.log("email: ", req.user.email);
  //     response = await authenticationPGRepository.loginFailed(req.user.email);
  //     console.log("response: ", response);
  //   }
  //   console.log('response: ',response)
  //   res.json({
  //     isAuthenticated: false,
  //     loginAttempts: response ? response.login_attempts : 'NA',
  //     atcPhone: response ? response.atcPhone : 'NA',
  //     userExists: expressObj.userExists,
  //     captchaSuccess: true,
  //   });
  // }

  next()
});


// ERROR HANDLER
app.use(async function (err, req, res, next) {
  logger.error(err.message);
  ObjLog.log(err.message);

  const resp = await authenticationPGRepository.getIpInfo(
    req.connection.remoteAddress
  );
  const countryResp = null;
  let sess = null;

  if (resp) countryResp = resp.country_name;

  if (await authenticationPGRepository.getSessionById(req.sessionID))
    sess = req.sessionID;

  const log = {
    is_auth: req.isAuthenticated(),
    success: false,
    failed: true,
    ip: req.connection.remoteAddress,
    country: countryResp,
    route: null,
    session: sess,
  };

  await authenticationPGRepository.insertLogMsg(log);

  if (
    err.message ===
    'duplicate key value violates unique constraint \\"ms_sixmap_users_email_user_key\\"'
  )
    res.status(500).send({
      error: "BUSINESS_ERROR",
      msg: "Esa dirección de correo ya está en uso. Prueba con otro.",
    });
  else res.status(500).send({ error: "SERVER_ERROR", msg: err.message });
});

export default app;
