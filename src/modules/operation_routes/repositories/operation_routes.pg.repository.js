import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const operation_routesRepository = {};
const context = "operation_routes PG Repository";

operation_routesRepository.getoperation_routes = async () => {
  try {
    logger.info(`[${context}]: Getting operation_routes from db`);
    ObjLog.log(`[${context}]: Getting operation_routes from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_get_operation_routes()`
    );
    return resp.rows[0].sp_get_operation_routes;
  } catch (error) {
    throw error;
  }
};

export default operation_routesRepository;
