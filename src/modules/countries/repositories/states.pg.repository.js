import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const countryStatesRepository = {};
const context = "country States PG Repository";

countryStatesRepository.getStatesByCountryId = async (countryId) => {
  try {
    logger.info(
      `[${context}]: Getting country states by id ${countryId} from db`
    );
    ObjLog.log(
      `[${context}]: Getting country states by id ${countryId} from db`
    );
    await poolSM.query("SET SCHEMA 'sec_emp'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_states_get_by_country_id(${countryId})`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

export default countryStatesRepository;
