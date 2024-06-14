import axios from "axios";
import { logger } from "../../../utils/logger";
import ObjLog from "../../../utils/ObjLog";
import { env } from "../../../utils/enviroment";

const veriflevelsHTTPRepository = {};
const context = "Verif Levels HTTP Repository";

// Clave de API de GeoNames
const username = 'thonygrz';

// Endpoint de GeoNames
const url = `http://api.geonames.org/countryInfoJSON?username=${username}`;

// Función para obtener el código alfa-2 dado el código alfa-3
const getCca2FromCca3 = async (cca3) => {
  try {
    const response = await axios.get(url);
    const countries = response.data.geonames;

    for (const country of countries) {
      if (country.isoAlpha3 === cca3) {
        return country.countryCode;
      }
    }
    return null;
  } catch (error) {
    console.error('Error al realizar la solicitud a GeoNames:', error);
    return null;
  }
};

veriflevelsHTTPRepository.getCountryIsoCodeCCA2 = async (isoCodeCCA3) => {
  logger.debug(`[${context}]: Getting iso code cca2 - country ${isoCodeCCA3}`)
  const resp = await getCca2FromCca3(isoCodeCCA3)
  const isoCode = resp
  return isoCode;
}

export default veriflevelsHTTPRepository;
