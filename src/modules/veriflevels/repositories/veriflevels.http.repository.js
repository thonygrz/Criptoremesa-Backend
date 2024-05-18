import axios from "axios";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import { env } from "../../../utils/enviroment";

const veriflevelsHTTPRepository = {};
const context = "Verif Levels HTTP Repository";

veriflevelsHTTPRepository.getCountryIsoCodeCCA2 = async (isoCodeCCA3) => {
  logger.debug(`[${context}]: Getting iso code cca2`)
  const resp = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${isoCodeCCA3}`);
  const isoCode = resp.data[0].cca2
  return isoCode;
}

export default veriflevelsHTTPRepository;