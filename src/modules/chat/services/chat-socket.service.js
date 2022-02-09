import chatPGRepository from "../repositories/chat.pg.repository";
// import {fileTypeFromBuffer} from 'file-type';
var Magic = require('mmmagic').Magic;
const chaSocketService = {};

chaSocketService.sendMessage = async (body) => {
  try {
    if (body.file) {
        var magic = new Magic();
  
            magic.detect(body.file, function(err, result) {
                if (err) throw err;
                console.log(result);
                // output: Python script, ASCII text executable
            });
        // console.log('BCUWIBCHJWEBKCJXW',await fileTypeFromBuffer(body.file));
    }  
    // await chatPGRepository.sendMessage(body);
  } catch (error) {
    console.log(error)
  }
};

export default chaSocketService;
