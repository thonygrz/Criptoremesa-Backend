import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const doc_typesPGRepository = {};
const context = "doc_types PG Repository";

doc_typesPGRepository.getDocTypes = async (query) => {
  try {
    logger.info(`[${context}]: Getting doc_types client from db`);
    ObjLog.log(`[${context}]: Getting doc_types client from db`);

    if (query.person_type === 'Jurídico')
      query.person_type = 'Jurídica'

    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM v_ident_doc_type_get_active(
                                                  ${query.id_country ? query.id_country : null},
                                                  ${query.person_type ? `'${query.person_type}'` : null},
                                                  ${query.signup_or_payment ? `'${query.signup_or_payment}'` : null}
                                                  )`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

doc_typesPGRepository.getDocTypeById = async (docTypeId) => {
  try {
    logger.info(`[${context}]: Getting doc type by Id ${docTypeId} from db`);
    ObjLog.log(`[${context}]: Getting doc type by Id ${docTypeId} from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_get_doc_type_by_id(${docTypeId})`
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
};

export default doc_typesPGRepository;
