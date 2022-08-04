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
    logger.info(`[${context}]: Inserting sell exchange on db`);
    ObjLog.log(`[${context}]: Inserting sell exchange on db`);
    
    body.mode = 'app'
    
    console.log("🚀 ~ InsertSellExchange")
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
    
    body.mode = 'app'
    
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
    
    body.mode = 'app'
    
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
    
    body.mode = 'app'
    
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

    console.log('QUERYYY: ',`SELECT * FROM prc_mng.sp_get_exchange_limits(
      ${query.id_operation_route === 'null' ? null : query.id_operation_route},
      ${query.id_verification === 'null' ? null : query.id_verification},
      ${query.id_exchange_type === 'null' ? null : query.id_exchange_type}
    )`)

    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_get_exchange_limits(
                                                      ${query.id_operation_route === 'null' ? null : query.id_operation_route},
                                                      ${query.id_verification === 'null' ? null : query.id_verification},
                                                      ${query.id_exchange_type === 'null' ? null : query.id_exchange_type}
                                                    )`
    );
    return resp.rows[0].sp_get_exchange_limits;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.getExchangesByUser = async (query) => {
  try {
    logger.info(`[${context}]: Getting exchanges by user from db`);
    ObjLog.log(`[${context}]: Getting exchanges by user from db`);
    await poolSM.query("SET SCHEMA 'sec_cust'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_get_last_exchanges_by_user(
                                                      ${query.email_user === 'null' ? null : `'${query.email_user}'`},
                                                      ${query.limit === 'null' ? null : query.limit},
                                                      ${query.start_date === 'null' ? null : query.start_date},
                                                      ${query.end_date === 'null' ? null : query.end_date},
                                                      'app'
                                                    )`
    );
    if (resp.rows[0].sp_get_last_exchanges_by_user)
      return resp.rows[0].sp_get_last_exchanges_by_user;
    else return [];
  } catch (error) {
    throw error;
  }
};

exchangesRepository.getTransactionByConfNum = async (confNum) => {
  try {
    logger.info(`[${context}]: Getting transaction by confirmation number from db`);
    ObjLog.log(`[${context}]: Getting transaction by confirmation number from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_get_transaction_by_conf_number(
                                                        '${confNum}'
                                                      )`
    );
    if (resp.rows[0].sp_get_transaction_by_conf_number)
      return resp.rows[0].sp_get_transaction_by_conf_number;
    else return [];
  } catch (error) {
    throw error;
  }
};

exchangesRepository.getUnconfirmedTransactions = async () => {
  try {
    logger.info(`[${context}]: Getting unconfirmed transactions from db`);
    ObjLog.log(`[${context}]: Getting unconfirmed transactions from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM sp_get_unconfirmed_exchanges()`
    );
    if (resp.rows[0].sp_get_unconfirmed_exchanges)
      return resp.rows[0].sp_get_unconfirmed_exchanges;
    else return [];
  } catch (error) {
    throw error;
  }
};

exchangesRepository.confirmTransaction = async (confNum) => {
  try {
    logger.info(`[${context}]: Confirming transaction on db`);
    ObjLog.log(`[${context}]: Confirming transaction on db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT prc_mng.sp_confirm_exchange(${confNum})`
    );
    if (resp.rows[0].sp_confirm_exchange)
      return resp.rows[0].sp_confirm_exchange;
    else return [];
  } catch (error) {
    throw error;
  }
};

exchangesRepository.setExternalTransactionStatus = async (idExchangePub,status) => {
  try {
    logger.info(`[${context}]: Setting ${status} status on db`);
    ObjLog.log(`[${context}]: Setting ${status} status on db`);
    
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_set_external_transaction_status(
                                                                  ${idExchangePub ? `'${idExchangePub}'` : null},
                                                                  ${status ? `'${status}'` : null},
                                                                )`
    );
    return resp.rows[0].sp_set_external_transaction_status;
  } catch (error) {
    throw error;
  }
};

exchangesRepository.insertExchangeResponse = async (idExchangePub,response) => {
  try {
    logger.info(`[${context}]: Inserting exchange response on db`);
    ObjLog.log(`[${context}]: Inserting exchange response on db`);
    
    await poolSM.query("SET SCHEMA 'prc_mng'");
    const resp = await poolSM.query(
      `SELECT * FROM prc_mng.sp_insert_exchange_response(
                                                          ${idExchangePub ? `'${idExchangePub}'` : null},
                                                          ($1),
                                                        )`,
                                                        [response]
    );
    return resp.rows[0].sp_insert_exchange_response;
  } catch (error) {
    throw error;
  }
};

export default exchangesRepository;