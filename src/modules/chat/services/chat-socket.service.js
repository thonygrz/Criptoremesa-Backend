import chatPGRepository from "../repositories/chat.pg.repository";
import {fileTypeFromBuffer} from 'file-type';

const chaSocketService = {};

chaSocketService.sendMessage = async (body) => {
  try {
    if (body.file) {
        console.log('BCUWIBCHJWEBKCJXW',await fileTypeFromBuffer(body.file));
    }  
    // await chatPGRepository.sendMessage(body);
  } catch (error) {
    console.log(error)
  }
};

export default chaSocketService;
