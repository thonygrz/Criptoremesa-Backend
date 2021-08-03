import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { logger } from "../utils/logger";
import ObjLog from "../utils/ObjLog";
import { env } from "../utils/enviroment";
import routerIndex from "../routes/index.routes";
import passport from "passport";
import requestIP from "request-ip";
import session from "express-session";
let pgSession = require("connect-pg-simple")(session);
import pgPool from "../db/pg.connection";
import ObjUserSessionData from "../utils/ObjUserSessionData";
import authenticationPGRepository from "../modules/authentication/repositories/authentication.pg.repository";
import formidableMiddleware from "express-formidable";
// import { events } from "../modules/users/services/users.service";

// SETTINGS
const app = express();
app.set("port", env.PORT || 3000);
const opts = {
  multiples: true,
  uploadDir:
    env.FILES_DIR,
  maxFileSize: 2 * 1024 * 1024,
  keepExtensions: true,
};

// MIDDLEWARES
app.use(morgan("dev", { stream: logger.stream }));
app.use(json());
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
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
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day (1000 ms / sec * 60 sec /1 min * 60 min /1 h * 24 h/1 day)
  })
);
// console.log("events", events);
// app.use(formidableMiddleware(opts, events));
app.use(requestIP.mw());
app.use((req, res, next) => {
  logger.info(`[Request]: ${req.method} ${req.originalUrl}`);
  ObjLog.log(`[Request]: ${req.method} ${req.originalUrl}`);
  next();
});
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.get("/", async (req, res) => {
  res.status(200).send("Server running");
});
app.use("/cr", routerIndex);

app.use((req, res, next) => {
  ObjUserSessionData.set({
    session: {
      session_id: req.session.id,
      cookie: req.session.cookie,
    },
    user: req.user,
  });

  next();
});

// ERROR HANDLER
app.use(async function (err, req, res, next) {
  logger.error(err.message);
  ObjLog.log(err.message);

  const resp = await authenticationPGRepository.getIpInfo(req.clientIp);
  const countryResp = null;
  let sess = null;

  if (resp) countryResp = resp.country_name;

  if (await authenticationPGRepository.getSessionById(req.sessionID))
    sess = req.sessionID;

  const log = {
    is_auth: req.isAuthenticated(),
    success: false,
    failed: true,
    ip: req.clientIp,
    country: countryResp,
    route: null,
    session: sess,
  };

  await authenticationPGRepository.insertLogMsg(log);
  res.status(500).send({ error: "SERVER_ERROR", message: err.message });
});

export default app;
