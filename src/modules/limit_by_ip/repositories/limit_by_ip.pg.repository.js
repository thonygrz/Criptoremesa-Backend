import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const limit_by_ipPGRepository = {};
const context = "limit_by_ip PG Repository";

limit_by_ipPGRepository.verifyRouteByIp = async (route,ip) => {
  try {
    logger.info(`[${context}]: Verifying route by ip on db`);
    ObjLog.log(`[${context}]: Verifying route by ip on db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `SELECT * FROM sp_verify_route_by_ip(
        '${route}',
        '${ip}'
      )`
    );
    console.log(resp.rows[0].sp_verify_route_by_ip)
    return resp.rows[0].sp_verify_route_by_ip.message;
  } catch (error) {
    throw error;
  }
};

export default limit_by_ipPGRepository;
