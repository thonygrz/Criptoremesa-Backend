import { poolSM } from "../db/pg.connection";
import { logger } from "./logger";
import ObjLog from "./ObjLog";

const countriesRepository = {};
const context = "Files Namer";

countriesRepository.getFileName = async (email,fileInfo) => {
  try {
    logger.info(`[${context}]: Naming file`);
    ObjLog.log(`[${context}]: Naming file`);

    if (fileInfo.type === 'kyc' || fileInfo.type === 'captures' || fileInfo.type === 'others') {

        let basePath = '/repo-cr'

        // se obtiene informacion desde bd para nombrar archivo

            // se obtiene usuario

              const user = (await poolSM.query(
                `
                  SELECT U.*, C.viewing_name
                  FROM sec_cust.ms_sixmap_users AS U, sec_emp.ms_countries AS C
                  WHERE U.email_user = '${email}'
                  AND C.id_country = U.id_resid_country
                `
              )).rows[0];

            // se obtiene pais

                let country = user.viewing_name
                
            // se obtiene nombre de carpeta de usuario

                let userFolderName

                if ((user.id_verif_level === 1 && user.verif_level_apb === true) || user.id_verif_level > 1){
                  userFolderName = `${user.cust_cr_cod_pub}-${user.ident_doc_number}`
                } else {
                  userFolderName = user.id_user
                }

            // se obtiene tipo de file

              let fileType

              if (fileInfo.type === 'kyc' || fileInfo.type === 'captures' || fileInfo.type === 'others'){
                fileType = fileInfo.type
              } else {
                return null
              }

              basePath += `/${country}/${userFolderName}/${fileType}` 

              return {
                  path: basePath.toLowerCase(),
                  user
              }

            // se obtiene nombre del archivo
            
              let fileName

              switch (fileType) {
                case 'kyc':
                  
                case 'captures':
                case 'others':
              }

                // logger.silly(info)
                // await poolSM.query("SET SCHEMA 'sec_cust'");

                // let resp = await poolSM.query(`SELECT * FROM sp_get_countries_currencies(${email_user === null ? null : `'${email_user}'`},'${type}')`)
                // if (resp.rows[0].sp_get_countries_currencies)
                // return resp.rows[0].sp_get_countries_currencies;
                // else return null;

            // se valida que exista carpeta del pais y si no se crea
            // se valida que exista carpeta del usuario y si no se crea
            // se valida que exista carpeta del tipo y si no se crea

            // se busca numeracion de archivos del mismo tipo y se asigna

            // se retorna nombre del archivo
    } else {
        return {
                    error: 'Invalid file type'
                }
    }
    
  } catch (error) {
    throw error;
  }
};

export default countriesRepository;