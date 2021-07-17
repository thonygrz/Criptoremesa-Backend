import passport from "passport";
import PassportLocal from "passport-local";
import { logger } from "./logger";
import ObjLog from "./ObjLog";
import authenticationPGRepository from "../modules/authentication/repositories/authentication.pg.repository";
import bcrypt from "bcryptjs";
import guard from "../utils/guard";
import ObjUserSessionData from "../utils/ObjUserSessionData";

const LocalStrategy = PassportLocal.Strategy;
const context = "Authentication module";
let ip = null;
let user;

const expressObj = {
  req: null,
  res: null,
  next: null,
  isAuthenticated: false,
  userExists: false,
};

// THIS SENDS A CUSTOM RESPONSE IF USER LOGS IN CORRECTLY
async function resp(user) {
  try {
    let countryResp = null;
    let sess = null;

    const resp = await authenticationPGRepository.getIpInfo(
      expressObj.req.clientIp
    );
    if (resp) countryResp = resp.country_name;

    if (
      await authenticationPGRepository.getSessionById(expressObj.req.sessionID)
    )
      sess = expressObj.req.sessionID;

    const log = {
      is_auth: expressObj.req.isAuthenticated(),
      success: true,
      failed: false,
      ip: expressObj.req.clientIp,
      country: countryResp,
      route: "/login",
      session: sess,
    };
    await authenticationPGRepository.insertLogMsg(log);
    expressObj.res.status(200).send({
      isAuthenticated: expressObj.isAuthenticated,
      user,
    });
  } catch (error) {
    expressObj.next(error);
  }
}

//PASSPORT AUTHENTICATION

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      try {
        // UPDATE IP IN BD
        let countryResp = null;
        let sess = null;
        expressObj.isAuthenticated = false;
        expressObj.userExists = false;

        await authenticationPGRepository.updateIPSession(
          req.sessionID,
          req.clientIp
        );

        logger.info(`[${context}]: Checking user`);
        ObjLog.log(`[${context}]: Checking user`);

        // if (guard.getUsernameField() === "email")
        user = await authenticationPGRepository.getUserByEmail(email);
        // else
        //   user = await authenticationPGRepository.getUserByUsername(username);

        if (user) {
          logger.info(`[${context}]: User found, checking password`);
          ObjLog.log(`[${context}]: User found, checking password`);

          expressObj.userExists = true;

          await authenticationPGRepository.updateIPUser(
            user.id_uuid,
            req.clientIp,
            req.sessionID
          );

          let match = await bcrypt.compare(password, user.password);

          if (match) {
            logger.info(`[${context}]: Successful login`);
            ObjLog.log(`[${context}]: Successful login`);

            user = await authenticationPGRepository.getUserById(user.id_uuid);

            expressObj.isAuthenticated = true;

            await resp(user);

            done(null, user);
            expressObj.req = req;

            return true;
          }
          logger.error(`[${context}]: User and password do not match`);
          ObjLog.log(`[${context}]: User and password do not match`);
          if (await authenticationPGRepository.getSessionById(req.sessionID))
            sess = req.sessionID;

          const log = {
            is_auth: req.isAuthenticated(),
            success: false,
            failed: true,
            ip: req.clientIp,
            country: countryResp,
            route: "/login",
            session: sess,
          };
          authenticationPGRepository.insertLogMsg(log);

          done(null, false);
        } else {
          logger.error(`[${context}]: User and password do not match`);
          ObjLog.log(`[${context}]: User and password do not match`);

          if (await authenticationPGRepository.getSessionById(req.sessionID))
            sess = req.sessionID;

          const log = {
            is_auth: req.isAuthenticated(),
            success: false,
            failed: true,
            ip: req.clientIp,
            country: countryResp,
            route: "/login",
            session: sess,
          };
          authenticationPGRepository.insertLogMsg(log);
          done(null, false);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  // PASSPORT LOOKS FOR THE ID AND STORE IT IN SESSION
  done(null, user.id_uuid);
});

passport.deserializeUser(async function (id, done) {
  try {
    // PASSPORT LOOKS FOR THE USER OBJECT WITH THE PREVIOUS ID
    const user = await authenticationPGRepository.getUserById(id);

    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default {
  verify: async (req, res, next) => {
    try {
      expressObj.req = req;
      expressObj.res = res;
      expressObj.next = next;

      // passport.authenticate("local")(req, res, next);
      passport.authenticate("local", async function (err) {
        if (err) {
          return next(err);
        }
        if (!expressObj.isAuthenticated) {
          let attempts = null;
          if (user) {
            attempts = await authenticationPGRepository.loginFailed(
              user.id_uuid
            );
          }

          res.json({
            isAuthenticated: false,
            loginAttempts: attempts,
            userExists: expressObj.userExists,
          });
        }
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      let countryResp = null;
      let sess = null;

      req.session.destroy();
      const resp = await authenticationPGRepository.getIpInfo(req.clientIp);
      if (resp) countryResp = resp.country_name;
      if (await authenticationPGRepository.getSessionById(req.sessionID))
        sess = req.sessionID;

      const log = {
        is_auth: req.isAuthenticated(),
        success: true,
        failed: false,
        ip: req.clientIp,
        country: countryResp,
        route: "/logout",
        session: sess,
      };
      await authenticationPGRepository.insertLogMsg(log);
      res.status(200).json({ message: "Logged out succesfully" });
    } catch (error) {
      next(error);
    }
  },
  signup: async (req, res, next) => {
    try {
      let countryResp = null;
      let sess = null;

      let password = await bcrypt.hash(req.body.password, 10);
      ObjUserSessionData.set({
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        last_name: req.body.last_name,
        second_last_name: req.body.second_last_name,
        username: req.body.username,
        email_user: req.body.email_user,
        password,
        gender: req.body.gender,
        date_birth: req.body.date_birth,
        ident_doc_number: req.body.ident_doc_number,
        main_phone: req.body.main_phone,
        main_phone_wha: req.body.main_phone_wha,
        resid_city: req.body.resid_city,
        departments: req.body.departments,
        id_ident_doc_type: req.body.id_ident_doc_type,
        id_resid_country: req.body.id_resid_country,
        id_nationality_country: req.body.id_nationality_country,
        last_ip_registred: req.clientIp,
      });
      await authenticationPGRepository.insert(ObjUserSessionData.get());

      const resp = authenticationPGRepository.getIpInfo(req.clientIp);
      if (resp) countryResp = resp.country_name;
      if (await authenticationPGRepository.getSessionById(req.sessionID))
        sess = req.sessionID;

      const log = {
        is_auth: req.isAuthenticated(),
        success: true,
        failed: false,
        ip: req.clientIp,
        country: countryResp,
        route: "/signup",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);
      res.status(200).json({ message: "User registred succesfully" });
    } catch (error) {
      next(error);
    }
  },
};
