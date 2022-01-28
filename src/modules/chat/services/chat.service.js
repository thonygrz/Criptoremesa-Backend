import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import chatPGRepository from "../repositories/chat.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import fs from "fs";
import formidable from "formidable";
import { env } from "../../../utils/enviroment";

const chatService = {};
const context = "chat Service";

chatService.sendMessage = async (req, res, next) => {
  try {
    let countryResp = null;
    let sess = null;

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
      route: "/chat/sendMessage",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    let fileError = false;

    const form = formidable({
      multiples: true,
      uploadDir: env.FILES_DIR,
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
    });

    form.onPart = (part) => {
      console.log("part: ", part.mime);
      if (
        !fileError &&
        !(
          part.mime === "image/png" ||
          part.mime === "image/jpg" ||
          part.mime === "image/jpeg" ||
          part.mime === "image/gif" ||
          part.mime === "application/pdf" ||
          part.mime === null
        )
      ) {
        fileError = true;
        form.emit("error");
      } else {
        form.handlePart(part);
      }
    };

    form.on("error", function (err) {
      if (fileError) {
        next({
          message: `Uno o varios archivos no tienen formato permitido`,
        });
      } else {
        fileError = true;
        console.log("error dentro del formerror: ", err);

        next({
          message: `El archivo subido ha excedido el límite, vuelve a intentar con uno menor a ${form.maxFileSize} B`,
        });
      }
    });

    form.parse(req, async function (err, fields, files) {
      console.log("fileError ", fileError);
      console.log("files ", files);
      console.log("fields ", fields);

      let file_path =
        form.uploadDir + `/chat-${fields.email_user}__${files.file.name}`;

      Object.values(files).forEach((f) => {
        if (
          f.type === "image/png" ||
          f.type === "image/jpg" ||
          f.type === "image/jpeg" ||
          f.type === "image/gif" ||
          f.type === "application/pdf"
        ) {
          fs.rename(
            f.path,
            form.uploadDir + `/chat-${fields.email_user}__${f.name}`,
            (error) => {
              if (error) {
                console.log("error dentro del rename: ", error);
                next(error);
              }
            }
          );
        }
      });
      try {
        if (!fileError) {
          console.log("FILE: ", file_path);
          console.log("a la bd: ", {
            ...fields,
            file_path
          });
          await chatPGRepository.sendMessage({
            ...fields,
            file_path
          });

          res.status(200).json({ message: "Archivos subidos" });
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    console.log("error dentro del catch: ", error);
    next(error);
  }
};

export default chatService;
