import chatPGRepository from "../repositories/chat.pg.repository";
// import {fileTypeFromBuffer} from 'file-type';
var mmm = require('mmmagic'),
      Magic = mmm.Magic;
const chaSocketService = {};

chaSocketService.sendMessage = async (body) => {
  try {
    if (body.file) {
        var magic = new Magic(mmm.MAGIC_MIME_TYPE | mmm.MAGIC_MIME_ENCODING);
  
            magic.detectFile(body.file, function(err, result) {
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
