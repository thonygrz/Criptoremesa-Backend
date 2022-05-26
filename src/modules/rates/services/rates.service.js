import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import ratesPGRepository from "../repositories/rates.pg.repository";
import authenticationPGRepository from "../../authentication/repositories/authentication.pg.repository";
import { env } from "../../../utils/enviroment";
import {MANUAL_RATES} from '../constants/manualRates.constants'
import axios from 'axios'

const ratesService = {};
const context = "rates Service";
let events = {};

ratesService.rangeRates = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await ratesPGRepository.rangeRates();
    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/rates/rangeRates",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

ratesService.rateTypes = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await ratesPGRepository.rateTypes();
    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/rates/rateTypes",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

ratesService.userRates = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await ratesPGRepository.userRates(req.query);
    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/rates/userRates",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

ratesService.fullRates = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    if ((req.query.email_user === 'null') || (req.isAuthenticated() && req.query.email_user && req.query.email_user !== 'null')) {
      let data = await ratesPGRepository.fullRates(req.query);
      const resp = authenticationPGRepository.getIpInfo(
        req.connection.remoteAddress
      );
      if (resp) countryResp = resp.country_name;
      if (await authenticationPGRepository.getSessionById(req.sessionID))
        sess = req.sessionID;
        
      const log = {
        is_auth: req.isAuthenticated(),
        success: true,
        failed: false,
        ip: req.connection.remoteAddress,
        country: countryResp,
        route: "/rates/fullRates",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);

      let currentManualRate = data.manualRates.find(e => e.rate_type_name === MANUAL_RATES.VIPF )

      console.log('currentManualRate: ',currentManualRate)
      
      let fullRateFromAPI = (await axios.get(`https://api.currencyfreaks.com/latest?apikey=${env.CURRENCY_FREAKS_API_KEY}&symbols=${currentManualRate.currency_origin_iso_code}`)).data;
      
      if (fullRateFromAPI.rates[currentManualRate.currency_origin_iso_code]){
        data.localAmountLimit = currentManualRate.amount_limit * (fullRateFromAPI.rates[currentManualRate.currency_origin_iso_code] * 0.97)
        res.status(200).json(data);
      }
      else
        next({message: 'There was an error getting Currency Freaks rate.'})
    } else {
      req.session.destroy();

      const resp = authenticationPGRepository.getIpInfo(
        req.connection.remoteAddress
      );
      let countryResp = null;
      sess = null;

      if (resp) countryResp = resp.country_name;

      if (await authenticationPGRepository.getSessionById(req.sessionID))
        sess = req.sessionID;

      const log = {
        is_auth: req.isAuthenticated(),
        success: false,
        failed: true,
        ip: req.connection.remoteAddress,
        country: countryResp,
        route: "/protected-route",
        session: sess,
      };
      authenticationPGRepository.insertLogMsg(log);

      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

ratesService.promo = async (req, res, next) => {
  try {

    let countryResp = null;
    let sess = null;

    let data = await ratesPGRepository.promo(req.query);
    const resp = authenticationPGRepository.getIpInfo(
      req.connection.remoteAddress
    );
    if (resp) countryResp = resp.country_name;
    if (await authenticationPGRepository.getSessionById(req.sessionID))
      sess = req.sessionID;

    const log = {
      is_auth: req.isAuthenticated(),
      success: true,
      failed: false,
      ip: req.connection.remoteAddress,
      country: countryResp,
      route: "/rates/promo",
      session: sess,
    };
    authenticationPGRepository.insertLogMsg(log);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default ratesService;
export { events };
