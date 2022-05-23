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
  userActiveSession: false
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

    if (user.expired){
      expressObj.res.status(401).send({
        message: 'There is already an active session with this user. Try again in a few minutes.'
      });
    }
    else if (user.user_blocked || (user.id_verif_level === 0 && !user.verif_level_apb)) {
      const log = {
        is_auth: expressObj.req.isAuthenticated(),
        success: false,
        failed: true,
        ip: expressObj.req.connection.remoteAddress,
        country: countryResp,
        route: "/login",
        session: sess,
      };
      let response;
      if (user) {
        // console.log("email: ", user.email_user);
        response = await authenticationPGRepository.loginFailed(user.email_user);
        console.log("response: ", response);
      }
      await authenticationPGRepository.insertLogMsg(log);
      console.log('VERIFICAAAAAAAA:',{
        user_blocked: user.user_blocked,
        id_verif_level: user.id_verif_level,
        verif_level_apb: user.verif_level_apb,
        atcPhone: response ? response.atcPhone : 'NA'
      })
      expressObj.res.status(400).send({
        user_blocked: user.user_blocked,
        id_verif_level: user.id_verif_level,
        verif_level_apb: user.verif_level_apb,
        atcPhone: response ? response.atcPhone : 'NA'
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
      console.log('VERIFICAAAAAAAA:',{
        isAuthenticated: expressObj.isAuthenticated,
        user,
        captchaSuccess: true,
      })
      expressObj.res.status(200).send({
        isAuthenticated: expressObj.isAuthenticated,
        user,
        captchaSuccess: true,
      });
    }
    console.log('prueba')
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
        blockedOrNotVerified = false;

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

            // console.log('user: ',user)

            await authenticationPGRepository.updateIPUser(
              user.id_uuid,
              req.connection.remoteAddress,
              req.sessionID
            );
            
            let match = await bcrypt.compare(password, user.password);

            if (match) {
              logger.info(`[${context}]: Successful login`);
              ObjLog.log(`[${context}]: Successful login`);

              console.log("🚀 ~ file: auth.js ~ line 186 ~ email", email)
              
              expressObj.userActiveSession = await authenticationPGRepository.userHasAnActiveSession(email)
              console.log("🚀 ~ file: auth.js ~ line 190 ~ expressObj.userActiveSession", expressObj.userActiveSession)

              if (expressObj.userActiveSession){
                // req.session.destroy();

                req.session = null;

                user.expired = true
                await resp(user);
                
                return done(null, false);
              } else {
                expressObj.isAuthenticated = true;

                await resp(user);

                return done(null, user);
              }
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
      } catch (error) {
        throw error;
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  // PASSPORT LOOKS FOR THE ID AND STORE IT IN SESSION
  console.log("serialize ");
  if (user) done(null, user.email_user);
});

passport.deserializeUser(async function (email_user, done) {
  try {
    // PASSPORT LOOKS FOR THE USER OBJECT WITH THE PREVIOUS email_user
    console.log("deserialize: ");

    const user = await authenticationPGRepository.getUserByEmail(email_user);

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
        console.log('blockedOrNotVerified: ',blockedOrNotVerified)
        console.log('expressObj.isAuthenticated: ',expressObj.isAuthenticated)
        if (!blockedOrNotVerified && !expressObj.isAuthenticated && !expressObj.userActiveSession){
            if (globalUser) {
              // console.log("email: ", globalUser.email_user);
              response = await authenticationPGRepository.loginFailed(globalUser.email_user);
              // console.log("response: ", response);
            }
            // console.log('response: ',response)
            console.log('VERIFICAAAAAAAA:',{
              isAuthenticated: false,
              loginAttempts: response ? response.login_attempts : 'NA',
              atcPhone: response ? response.atcPhone : 'NA',
              userExists: expressObj.userExists,
              captchaSuccess: true,
            })
            res.json({
              isAuthenticated: false,
              loginAttempts: response ? response.login_attempts : 'NA',
              atcPhone: response ? response.atcPhone : 'NA',
              userExists: expressObj.userExists,
              captchaSuccess: true,
            });
            expressObj.next()
          req.logIn(user, function(err) {
            if (err) {
              return next(err); }
          });
          
        }
        console.log("DENTRO DEL AUTHENTICATE");
  
        console.log("req.session despues de la strategy", req.session);
        // console.log("req.user despues de la strategy", req.user);

        expressObj.next();
        req.login(user, function(err) {
          if (err) {
            return next(err); }
        });
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
  }
};
