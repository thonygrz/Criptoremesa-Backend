import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import {env,ENVIROMENTS} from '../../../utils/enviroment'
import { WebpayPlus } from "transbank-sdk";
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from "transbank-sdk"

const transbankService = {};
const context = "transbank Service";

transbankService.getWebpayTransaction = async (req, res, next) => {
  try {
    logger.info(`[${context}]: Creating transaction`);
    ObjLog.log(`[${context}]: Creating transaction`);

    let buyOrder = '12345678';
    let sessionId = '12345678';
    let amount = 1000; 
    let returnUrl = 'https://bithonor.com/inicio-sesion';

    const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));
    const data = await tx.create(buyOrder, sessionId, amount, returnUrl);

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

export default transbankService;