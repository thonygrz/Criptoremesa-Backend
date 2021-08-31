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
let globalUser;
let blockedOrNotVerified = false;

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
      expressObj.req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;

    if (
      await authenticationPGRepository.getSessionById(expressObj.req.sessionID)
    )
      sess = expressObj.req.sessionID;

    if (user.user_blocked || (user.id_verif_level === 0 && !user.verif_level_apb)) {
      const log = {
        is_auth: expressObj.req.isAuthenticated(),
        success: false,
        failed: true,
        ip: expressObj.req.connection.remoteAddress,
        country: countryResp,
        route: "/login",
        session: sess,
      };
      await authenticationPGRepository.insertLogMsg(log);
      expressObj.res.status(400).send({
        user_blocked: user.user_blocked,
        id_verif_level: user.id_verif_level,
        verif_level_apb: user.verif_level_apb
      });
    } else {
      const log = {
        is_auth: expressObj.req.isAuthenticated(),
        success: true,
        failed: false,
        ip: expressObj.req.connection.remoteAddress,
        country: countryResp,
        route: "/login",
        session: sess,
      };
      await authenticationPGRepository.insertLogMsg(log);
      expressObj.res.status(200).send({
        isAuthenticated: expressObj.isAuthenticated,
        user,
        captchaSuccess: true,
      });
    }
    expressObj.next()
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
      passReqToCallback: true
    },
    async function (req, email, password, done) {
      try {
        // UPDATE IP IN BD
        let countryResp = null;
        let sess = null;
        expressObj.isAuthenticated = false;
        expressObj.userExists = false;

        // console.log('auth: ',req.sessionID,
        // req.connection.remoteAddress)

        await authenticationPGRepository.updateIPSession(
          req.sessionID,
          req.connection.remoteAddress
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

          

          if (user.user_blocked || (user.id_verif_level === 0 && !user.verif_level_apb)) {
            logger.error(`[${context}]: User is blocked or not verified`);
            ObjLog.log(`[${context}]: User is blocked or not verified`);

            blockedOrNotVerified = true;

            if (await authenticationPGRepository.getSessionById(req.sessionID))
            sess = req.sessionID;

            const log = {
              is_auth: req.isAuthenticated(),
              success: false,
              failed: true,
              ip: req.connection.remoteAddress,
              country: countryResp,
              route: "/login",
              session: sess,
            };
            authenticationPGRepository.insertLogMsg(log);

            await resp(user);

            done(null, false);
            expressObj.req = req;

          } else {

            expressObj.userExists = true;
            globalUser = user;

            await authenticationPGRepository.updateIPUser(
              user.id_uuid,
              req.connection.remoteAddress,
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
              ip: req.connection.remoteAddress,
              country: countryResp,
              route: "/login",
              session: sess,
            };
            authenticationPGRepository.insertLogMsg(log);

            return done(null, false);
          }
          
        } else {
          logger.error(`[${context}]: User and password do not match`);
          ObjLog.log(`[${context}]: User and password do not match`);

          if (await authenticationPGRepository.getSessionById(req.sessionID))
            sess = req.sessionID;

          const log = {
            is_auth: req.isAuthenticated(),
            success: false,
            failed: true,
            ip: req.connection.remoteAddress,
            country: countryResp,
            route: "/login",
            session: sess,
          };
          authenticationPGRepository.insertLogMsg(log);
          return done(null, false);
        }



        // console.log("DENTRO DE LA STRATEGY");
        // user = {
        //   email_user: 'anthony@gmail.com',
        //   name: "Thony"
        // }
        // return done(null, user);

      } catch (error) {
        throw error;
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  // PASSPORT LOOKS FOR THE ID AND STORE IT IN SESSION
  // console.log("serialize: ", user);
  if (user) done(null, user.email_user);
});

passport.deserializeUser(async function (email_user, done) {
  try {
    // PASSPORT LOOKS FOR THE USER OBJECT WITH THE PREVIOUS email_user
    const user = await authenticationPGRepository.getUserByEmail(email_user);
    // console.log("deserialize: ", user);

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

      // console.log("req.session antes de la strategy", req.session);
      // console.log("req.user antes de la strategy", req.user);
      // ObjUserSessionData.set({
      //   session: {
      //     session_id: req.session.id,
      //     cookie: req.session.cookie,
      //   },
      //   user: req.user,
      // });
      // res.status(200).send("prooving");

      // passport.authenticate("local")(req, res, next);

      // passport.authenticate("local")(req, res, next);
      passport.authenticate("local", async function (err,user,info) {
        if (err) {
          return expressObj.next(err);
        }
        let response = null;
        if (!blockedOrNotVerified){
          if (!user) {
            if (globalUser) {
              // console.log("email: ", globalUser.email);
              response = await authenticationPGRepository.loginFailed(globalUser.email);
              // console.log("response: ", response);
            }
            // console.log('response: ',response)
            res.json({
              isAuthenticated: false,
              loginAttempts: response ? response.login_attempts : 'NA',
              atcPhone: response ? response.atcPhone : 'NA',
              userExists: expressObj.userExists,
              captchaSuccess: true,
            });
            expressObj.next()
          }
          req.logIn(user, function(err) {
            if (err) {
              return next(err); }
          });
          // console.log("DENTRO DEL AUTHENTICATE");
  
          // console.log("req.session despues de la strategy", req.session);
          // console.log("req.user despues de la strategy", req.user);
        }
        
        expressObj.next();
      }
      )(req, res, next);
    } catch (error) {
      expressObj.next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      let countryResp = null;
      let sess = null;

      // console.log('req.user antes de hacer logout(): ',req.user)
      // console.log('req.session antes de hacer logout(): ',req.session)
      // console.log('req.sessionID antes de hacer logout(): ',req.sessionID)

      // req.session.destroy();
      // req.session.destroy((err) => res.redirect('/'));
      req.logOut();
      // req.session = null; 
      // req.sessionID = null; 

      // console.log('req.user despues de hacer logout(): ',req.user)
      // console.log('req.session despues de hacer logout(): ',req.session)
      // console.log('req.sessionID despues de hacer logout(): ',req.sessionID)

      const resp = await authenticationPGRepository.getIpInfo(
        req.connection.remoteAddress
      );
      if (resp) countryResp = resp.country_name;
      if (await authenticationPGRepository.getSessionById(req.sessionID))
        sess = req.sessionID;

      const log = {
        is_auth: req.isAuthenticated(),
        success: true,
        failed: false,
        ip: req.connection.remoteAddress,
        country: countryResp,
        route: "/logout",
        session: sess,
      };
      await authenticationPGRepository.insertLogMsg(log);
      res.status(200).json({ message: "Logged out succesfully" });
      next()
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
        last_ip_registred: req.connection.remoteAddress,
      });
      await authenticationPGRepository.insert(ObjUserSessionData.get());

      const resp = authenticationPGRepository.getIpInfo(
        req.connection.remoteAddress
      );
      if (resp) countryResp = resp.country_name;
      if (await authenticationPGRepository.getSessionById(req.sessionID))
        sess = req.sessionID;

      const log = {
        is_auth: req.isAuthenticated(),
        success: true,
        failed: false,
        ip: req.connection.remoteAddress,
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
