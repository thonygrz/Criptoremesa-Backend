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
import { poolCR } from "../db/pg.connection";
import ObjUserSessionData from "../utils/ObjUserSessionData";
import authenticationPGRepository from "../modules/authentication/repositories/authentication.pg.repository";

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
    origin: [
      "http://186.185.29.75:8081",
      "http://localhost:8081",
      "http://186.185.29.75:8080",
      "http://localhost:8080",
      "http://186.185.127.134:8080",
      "http://186.185.127.134:8081",
      "https://localhost:3010",
      "https://ec2-3-143-246-144.us-east-2.compute.amazonaws.com:3011",
      "https://localhost:3011",
      "https://localhost:8081",
      "https://ec2-3-143-246-144.us-east-2.compute.amazonaws.com:3020",
      "https://localhost:3020",
      "https://ec2-3-143-246-144.us-east-2.compute.amazonaws.com:3014",
      "https://localhost:3014",
      "https://ec2-18-216-25-44.us-east-2.compute.amazonaws.com",
      "https://nimobot.com",
      "https://www.nimobot.com",
      "https://sixmap.nimobot.com",
      "https://www.sixmap.nimobot.com",
      "http://192.168.0.105:8080",
      "http://186.167.250.194:8080",
    ],
    methods: "GET,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(helmet());
app.use(
  session({
    store: new pgSession({
      pool: poolCR,
      tableName: "session_obj", // Use another table-name than the default "session" one
      schemaName: "basics",
    }),
    secret: process.env.COOKIE_SECRET,
    resave: true, // true: inserta el usuario en la sesion despues de hacer login / false: solo lo hace cuando la tabla de sesion está vacía
    saveUninitialized: true,
    cookie: {
      expires: 300000,
      secure: true,
      // maxAge: 86400000,
    }, // 1 day (1000 ms / sec * 60 sec /1 min * 60 min /1 h * 24 h/1 day)
    // maxAge: 60
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  logger.debug(`[Request]: ${req.method} ${req.originalUrl}`);
  ObjLog.log(`[Request]: ${req.method} ${req.originalUrl}`);

  if (req.session.views) {
    // Increment the number of views.
    req.session.views++;

    // Session will expires after 1 min
    // of in activity
  } else {
    req.session.views = 1;
  }

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

  try {
    ObjUserSessionData.set({
      session: {
        session_id: req.session ? req.session.id : null,
        cookie: req.session ? req.session.cookie : null,
      },
      user: req.user,
    });
    // res.status(200).send("prooving");
  
    next();
  } catch (error) {
    next(error)
  }
});

// ERROR HANDLER
app.use(async function (err, req, res,next) {

  const context = "ERROR HANDLER";

  logger.error(`${context}: ${err.message}`);
  ObjLog.log(`${context}: ${err.message}`);
  
  // declaring log object
  const logConst = {
    is_auth: null,
    success: true,
    failed: false,
    ip: null,
    country: null,
    route: null,
    session: null,
  };

  // filling log object info
  let log = logConst;

  const businessError = {
                          error: "BUSINESS_ERROR",
                          msg: "Esa dirección de correo ya está en uso. Prueba con otro.",
                        }
  const serverError = { 
                        error: "SERVER_ERROR", 
                        msg: err.message 
                      }

  log.success = false;
  log.failed = true;
  log.is_auth = req.isAuthenticated();
  log.ip = req.header("Client-Ip");
  log.route = req.method + " " + req.originalUrl;
  log.params = req.params;
  log.query = req.query;
  log.body = req.body;
  log.status = 500;
  
  const resp = await authenticationPGRepository.getIpInfo(
    req.header("Client-Ip")
  );
  if (resp)
    log.country = resp.country_name ? resp.country_name : "Probably Localhost";
  if (await authenticationPGRepository.getSessionById(req.sessionID))
    log.session = req.sessionID;

  if ( err.message === 'duplicate key value violates unique constraint \\"ms_sixmap_users_email_user_key\\"') 
  {
    log.response = businessError;
    await authenticationPGRepository.insertLogMsg(log);
    res.status(500).send(businessError);
  }
  else {
    log.response = serverError;
    await authenticationPGRepository.insertLogMsg(log);
    res.status(500).send(serverError);
  }
});

export default app;
