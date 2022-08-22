import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const walletsRepository = {};
const context = "Wallets PG Repository";

walletsRepository.getWallets = async (onlyCompany) => {
  try {
    logger.info(`[${context}]: Getting wallets from db`);
    ObjLog.log(`[${context}]: Getting wallets from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");

    onlyCompany = onlyCompany === 'null' ? null :  onlyCompany
    const resp = await poolSM.query(
      `select * from prc_mng.sp_get_wallets(
                                              ${onlyCompany}
                                            )`
    );
    if (resp.rows[0].sp_get_wallets)
      return resp.rows[0].sp_get_wallets;
    else 
      []
  } catch (error) {
    throw error;
  }
};

export default walletsRepository;