import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const exchangesRepository = {};
const context = "exchanges PG Repository";

exchangesRepository.getExchangeRangeRates = async () => {
  try {
    logger.info(`[${context}]: Getting exchanges from db`);
    ObjLog.log(`[${context}]: Getting exchanges from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_get_exchange_range_rates()`
    );
    return resp.rows[0].sp_get_exchange_range_rates.range_rates;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.getExchangeRates = async () => {
  try {
    logger.info(`[${context}]: Getting exchange rates from db`);
    ObjLog.log(`[${context}]: Getting exchange rates from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_get_exchange_rates()`
    );
    return resp.rows[0].sp_get_exchange_rates.rates;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.insertBuyExchange = async (body) => {
  try {
    logger.info(`[${context}]: Inserting buy exchange on db`);
    ObjLog.log(`[${context}]: Inserting buy exchange on db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_lnk_cr_exchange_init(
                                                      ($1),
                                                      'Compra'
                                                    )`,
                                                    [body]
    );
    return resp.rows[0].sp_lnk_cr_exchange_init;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.insertSellExchange = async (body) => {
  try {
    logger.info(`[${context}]: Inserting buy exchange on db`);
    ObjLog.log(`[${context}]: Inserting buy exchange on db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_lnk_cr_exchange_init(
                                                      ($1),
                                                      'Venta'
                                                    )`,
                                                    [body]
    );
    return resp.rows[0].sp_lnk_cr_exchange_init;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.insertWithdrawExchange = async (body) => {
  try {
    logger.info(`[${context}]: Inserting buy exchange on db`);
    ObjLog.log(`[${context}]: Inserting buy exchange on db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_lnk_cr_exchange_init(
                                                      ($1),
                                                      'Retiro'
                                                    )`,
                                                    [body]
    );
    return resp.rows[0].sp_lnk_cr_exchange_init;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.insertDepositExchange = async (body) => {
  try {
    logger.info(`[${context}]: Inserting buy exchange on db`);
    ObjLog.log(`[${context}]: Inserting buy exchange on db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_lnk_cr_exchange_init(
                                                      ($1),
                                                      'Depósito'
                                                    )`,
                                                    [body]
    );
    return resp.rows[0].sp_lnk_cr_exchange_init;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.insertConversionExchange = async (body) => {
  try {
    logger.info(`[${context}]: Inserting buy exchange on db`);
    ObjLog.log(`[${context}]: Inserting buy exchange on db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_lnk_cr_exchange_init(
                                                      ($1),
                                                      'Conversión'
                                                    )`,
                                                    [body]
    );
    return resp.rows[0].sp_lnk_cr_exchange_init;
  } catch (error) {
    throw error;
  }
};

export default exchangesRepository;