import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import walletsRepository from "../repositories/wallets.pg.repository";

const walletsService = {};
const context = "Wallets Service";

walletsService.getWallets = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting wallets`);
    ObjLog.log(`[${context}]: Getting wallets`);
    let data = await walletsRepository.getWallets(req.query.onlyCompany);
    return {
      data,
      status: 200,
      success: true,
      failed: false
    }
  } catch (error) {
    next(error);
  }
};

export default walletsService;