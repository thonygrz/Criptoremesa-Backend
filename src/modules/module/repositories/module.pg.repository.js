import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";

const modulePGRepository = {};
const context = "Module PG Repository";

modulePGRepository.getData = async () => {
    logger.info(`[${context}]: Obtaning info from pg`);
    const resp = await pool.query("select * from ms_users_lists");
    return resp.rows;
}

export default modulePGRepository;