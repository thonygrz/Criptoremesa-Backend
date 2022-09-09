import { env } from '../utils/enviroment'
import axios from 'axios'
import { logger } from './logger'

let awsLambda = {}

async function request(method,baseURL,queryString,body) {
    logger.silly('REQUEST: '+ baseURL + (queryString ? '?' + queryString : ''))
    switch (method) {
        case 'POST':
            return (await axios.post(baseURL + (queryString ? '?' + queryString : ''),body)).data
        case 'GET':
            return (await axios.get(baseURL + '/' + endpoint + '?' + queryString + '&signature=' + signature)).data
    }
} 

awsLambda.comparePasswords = async function (pass1,pass2) {
    return await request('POST',env.AWS_LAMBDA_COMPARE_PASSWORDS,null,{pass1,pass2})
}

awsLambda.getLocalAmountLimit = async function (currentManualRate,fullRateFromAPI) {
    return await request('POST',env.AWS_LAMBDA_GET_LOCAL_AMOUNT_LIMIT,null,{currentManualRate,fullRateFromAPI})
}

export default awsLambda;