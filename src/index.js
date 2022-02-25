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
    key: fs.readFileSync(path.join(__dirname, "utils", "cert", "criptoremesa.key")),
    cert: fs.readFileSync(path.join(__dirname, "utils", "cert", "criptoremesa.cert")),
    requestCert: false,
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

console.log(app.get('env'))

SocketServer(httpsServer);
