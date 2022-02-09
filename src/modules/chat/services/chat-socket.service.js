import chatPGRepository from "../repositories/chat.pg.repository";
import {join} from 'path'
import {env} from '../../../utils/enviroment'

const chatSocketService = {};

chatSocketService.sendMessage = async (body) => {
  try {
    if (body.file) {
        let exists = true
        let pathName = join(env.FILES_DIR,`/${body.email_user}_${body.file_name}`)
        while (exists){
           let number = between(10000,99999);
           pathName = join(env.FILES_DIR,`/${email_user}-${number}_${body.file_name}`)
           if (!fs.existsSync(pathName)){
                exists = false
           }
        }
        fs.writeFileSync(pathName,body.file)
    }  
    await chatPGRepository.sendMessage(body);
  } catch (error) {
    console.log(error)
  }
};

export default chatSocketService;
