import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import wholesale_partnersRepository from "../repositories/wholesale_partners.pg.repository";

const wholesale_partnersService = {};
const context = "wholesale_partners Service";

wholesale_partnersService.insertWholesalePartnerInfo = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Inserting wholesale_partner`);
    ObjLog.log(`[${context}]: Inserting wholesale_partner`);
    console.log('req.file service: ',req.file)
    req.body.logo = req.file.path
    req.body.email_user = req.params.email_user
    let data = await wholesale_partnersRepository.insertWholesalePartnerInfo(req.body);

    let finalResp 

    if (data.message === 'Wholesale partner information successfuly inserted.')
      finalResp = {
                    data,
                    status: 200,
                    success: true,
                    failed: false
                  }
    else if (data.message === 'Error inserting wholesale partner information.')
      finalResp = {
        data,
        status: 403,
        success: false,
        failed: true
      }  
    return finalResp
  } catch (error) {
    next(error);
  }
};

wholesale_partnersService.getWholesalePartnerInfo = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Getting wholesale_partner`);
    ObjLog.log(`[${context}]: Getting wholesale_partner`);
    console.log('req.file service: ',req.file)
    req.body.logo = req.file.path
    req.body.email_user = req.params.email_user
    let data = await wholesale_partnersRepository.getWholesalePartnerInfo(req.params.slug);

    let finalResp 
    finalResp = {
                  data,
                  status: 200,
                  success: true,
                  failed: false
                }

    return finalResp
  } catch (error) {
    next(error);
  }
};

export default wholesale_partnersService;