import { poolSM } from "../../../db/pg.connection";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";

const wholesale_partnersRepository = {};
const context = "wholesale_partners PG Repository";

wholesale_partnersRepository.insertWholesalePartnerInfo = async (body) => {
  console.log("🚀 ~ body", body)
  try {
    logger.info(`[${context}]: Inserting wholesale_partner info from db`);
    ObjLog.log(`[${context}]: Inserting wholesale_partner info from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");

    const resp = await poolSM.query(
      `select * from sec_cust.sp_insert_wholesale_partner_info(
                                                                ${body.name === 'null' ? null : `'${body.name}'`},
                                                                ${body.slug === 'null' ? null : `'${body.slug}'`},
                                                                ${body.logo === 'null' ? null : `'${body.logo}'`},
                                                                ${body.theme === 'null' ? null : `'${body.theme}'`},
                                                                ${body.percent_profit === 'null' ? null : body.percent_profit},
                                                                ${body.email_user === 'null' ? null : `'${body.email_user}'`}
                                                              )`
    );
    if (resp.rows[0].sp_insert_wholesale_partner_info)
      return resp.rows[0].sp_insert_wholesale_partner_info;
    else 
      []
  } catch (error) {
    throw error;
  }
};

wholesale_partnersRepository.getWholesalePartnerInfo = async (slug) => {
  try {
    logger.info(`[${context}]: Inserting wholesale_partner info from db`);
    ObjLog.log(`[${context}]: Inserting wholesale_partner info from db`);
    await poolSM.query("SET SCHEMA 'prc_mng'");
    console.log("🚀 ~ resp1", resp)

    const resp = await poolSM.query(
      `select * from sec_cust.sp_get_wholesale_partner_info(
                                                                ${slug ? `'${slug}'` : null }
                                                              )`
    );
    console.log("🚀 ~ resp2", resp)
    if (resp.rows[0].sp_get_wholesale_partner_info){
      let info = resp.rows[0].get_bank_account_by_id[0];

      info.logo = fs.readFileSync(
        info.logo
      );
      return resp.rows[0].sp_get_wholesale_partner_info;
    }
    else 
      null
  } catch (error) {
    throw error;
  }
};

export default wholesale_partnersRepository;