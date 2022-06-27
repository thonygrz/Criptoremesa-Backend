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

exchangesRepository.startPreExchange = async (body) => {
  try {
    logger.info(`[${context}]: Starting pre exchange on db`);
    ObjLog.log(`[${context}]: Starting pre exchange on db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_store_pre_exchange('${JSON.stringify(body)}','${
        body.email_user
      }')`
    );
    if (resp.rows[0].sp_store_pre_exchange)
      return resp.rows[0].sp_store_pre_exchange;
    else return null;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.expiredPreExchange = async (id_pre_exchange) => {
  try {
    logger.info(`[${context}]: Expiring pre exchange on db`);
    ObjLog.log(`[${context}]: Expiring pre exchange on db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_expire_pre_exchange(${id_pre_exchange})`
    );
    if (resp.rows[0].sp_expire_pre_exchange)
      return resp.rows[0].sp_expire_pre_exchange;
    else return null;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.getPreExchangeByUser = async (email_user) => {
  try {
    logger.info(`[${context}]: Getting pre exchange on db`);
    ObjLog.log(`[${context}]: Getting pre exchange on db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM get_pre_exchange_by_user('${email_user}')`
    );
    if (resp.rows[0].get_pre_exchange_by_user)
      return resp.rows[0].get_pre_exchange_by_user;
    else return null;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.cancelPreExchange = async (id_pre_exchange) => {
  try {
    logger.info(`[${context}]: Getting pre exchange on db`);
    ObjLog.log(`[${context}]: Getting pre exchange on db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_cancel_pre_exchange(${id_pre_exchange})`
    );
    if (resp.rows[0].sp_cancel_pre_exchange)
      return resp.rows[0].sp_cancel_pre_exchange;
    else return null;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.insertBuyExchange = async (body) => {
  try {
    logger.info(`[${context}]: Inserting buy exchange on db`);
    ObjLog.log(`[${context}]: Inserting buy exchange on db`);

    body.mode = 'app'

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

exchangesRepository.getAmountLimits = async (query) => {
  try {
    logger.info(`[${context}]: Getting exchange amount limits from db`);
    ObjLog.log(`[${context}]: Getting exchange amount limits from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_get_exchange_limits(
                                                      ${query.id_operation_route === 'null' ? null : query.id_operation_route},
                                                      ${query.id_verification === 'null' ? null : query.id_verification},
                                                      ${query.id_exchange_type === 'null' ? null : query.id_exchange_type},
                                                    )`
    );
    return resp.rows[0].sp_get_exchange_limits;
  } catch (error) {
    throw error;
  }
};

export default exchangesRepository;