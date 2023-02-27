import "@babel/polyfill";
import { logger } from "./utils/logger";
import ObjLog from "./utils/ObjLog";
import app from "./app/server";
import path from "path";
import { SocketServer } from "./modules/sockets/sockets.coordinator";

///////////////////////////
// Para usar el certificado
///////////////////////////

const https = require("https");

const fs = require("fs");

const httpsServer = https.createServer(
  {
    key: fs.readFileSync('/etc/ssl/certs/zero-ssl/bithonor/private.key'),
    cert: fs.readFileSync('/etc/ssl/certs/zero-ssl/bithonor/certificate.crt'),
    ca: fs.readFileSync('/etc/ssl/certs/zero-ssl/bithonor/ssl-bundle.crt'),
    requestCert: true,
    rejectUnauthorized: false
  },
  app
);

httpsServer.listen(app.get("port"), "0.0.0.0", () => {
  logger.info(`Server on port ${app.get("port")}`);
  ObjLog.log(`Server on port ${app.get("port")}`);
});

////////////////////////////////
// Sin el certificado - forma 1
///////////////////////////////

// const https = require("https");

// const httpsServer = https.createServer(app);

// httpsServer.listen(app.get("port"), () => {
//   logger.info(`Server on port ${app.get("port")}`);
//   ObjLog.log(`Server on port ${app.get("port")}`);
// });

////////////////////////////////
// Sin el certificado - forma 2
///////////////////////////////

// const server = app.listen(app.get("port"), () => {
//   logger.info(`Server on port ${app.get("port")}`);
//   ObjLog.log(`Server on port ${app.get("port")}`);
// });

SocketServer(httpsServer);