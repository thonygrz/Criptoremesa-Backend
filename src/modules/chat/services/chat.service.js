import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import chatPGRepository from "../repositories/chat.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import fs from "fs";
import formidable from "formidable";
import { env, ENVIROMENTS } from "../../../utils/enviroment";

const chatService = {};
const context = "chat Service";

chatService.sendMessage = async (req, res, next) => {
  try {
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
          part.mime === "audio/webm" ||
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
      let file_path = null;

      if (files.file !== undefined && files.file.size > 0)
        file_path = form.uploadDir + `/chat-${fields.email_user}__${files.file.name}`;

      Object.values(files).forEach((f) => {
        if (
          f.type === "image/png" ||
          f.type === "image/jpg" ||
          f.type === "image/jpeg" ||
          f.type === "image/gif" ||
          f.type === "application/pdf" ||
          f.type === "audio/webm"
        ) {
          fs.rename(
            f.path,
            form.uploadDir + `/chat-${fields.email_user}__${f.name}`,
            (error) => {
              if (error) {
                next(error);
              }
            }
          );
        }
      });
      try {
        if (!fileError) {
          await chatPGRepository.sendMessage({
            email_user: fields.email_user === 'null' ? null : fields.email_user,
            emp_username: fields.emp_username === 'null' ? null : fields.emp_username,
            message_body: fields.message_body === 'null' ? null : fields.message_body,
            msg_date: fields.msg_date === 'null' ? null : fields.msg_date,
            file: fields.file === 'null' ? null : fields.file,
            is_sent: fields.is_sent === 'null' ? null : fields.is_sent,
            time_zone: fields.time_zone === 'null' ? null : fields.time_zone,
            uniq_id: fields.uniq_id === 'null' ? null : fields.uniq_id,
            file_path
          });

          res.status(200).json({ message: "Message delivered" });
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
};

chatService.getMessages = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting all messages from chat`);
    ObjLog.log(`[${context}]: Getting all messages from chat`);
    let data = await chatPGRepository.getMessages(req.params.email_user);
    if (data) {
      data.forEach((el) => {
      if (el.file !== 'null' && (el.type === 'image' || el.type === 'voice')) {
        el.file = fs.readFileSync(el.file);
      }
      })
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default chatService;
