import pool from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import fs from "fs";
import {env} from '../../../utils/enviroment'

const banksRepository = {};
const context = "banks PG Repository";

banksRepository.getOriginBanks = async (countryId,payMethodId,currencyId) => {
  try {
    logger.info(`[${context}]: Getting origin banks from db`);
    ObjLog.log(`[${context}]: Getting origin banks from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `select * from sp_get_origin_banks_by_country_and_currency({${countryId}},{${currencyId}})`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

banksRepository.getDestinyBanks = async (countryId,payMethodId,currencyId) => {
  try {
    logger.info(`[${context}]: Getting destiny banks from db`);
    ObjLog.log(`[${context}]: Getting destiny banks from db`);
    await pool.query("SET SCHEMA 'msg_app'");
    const resp = await pool.query(
      `select * from sp_ms_banks_get_destiny_banks('{${countryId}}','{${currencyId}}','{${payMethodId}}')`
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
};

banksRepository.getBankById = async (bankId) => {
  try {
    logger.info(`[${context}]: Getting bank by Id ${bankId} from db`);
    ObjLog.log(`[${context}]: Getting bank by Id ${bankId} from db`);
    await pool.query("SET SCHEMA 'sec_cust'");
    const resp = await pool.query(
      `select * from sp_ms_bank_by_id(${bankId})`
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
};

banksRepository.getBankAccountsById = async (body) => {
  try {
    logger.info(`[${context}]: Getting bank accounts from db`);
    ObjLog.log(`[${context}]: Getting bank accounts from db`);
    await pool.query("SET SCHEMA 'sec_cust'");

    const resp = await pool.query(
      `select * from get_bank_accounts_by_country(${body.id_country},${body.id_currency})`
    );
    let banks = resp.rows[0].get_bank_accounts_by_country
    banks.forEach(el => {
      el.image = fs.readFileSync(env.FILES_DIR + '/bank_logos/' + el.ident_name + '.png');
    });
    return resp.rows[0].get_bank_accounts_by_country;
  } catch (error) {
    throw error;
  }
};

export default banksRepository;
