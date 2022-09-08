import { env } from '../utils/enviroment'
import axios from 'axios'
import { logger } from './logger'

let awsLambda = {}
const baseURL = env.AWS_LAMBDA

async function request(method,endpoint,queryString,body) {
    logger.silly('REQUEST: '+ baseURL + '/' + endpoint + (queryString ? '?' + queryString : ''))
    switch (method) {
        case 'POST':
            return (await axios.post(baseURL + '/' + endpoint + (queryString ? '?' + queryString : ''),body)).data
        case 'GET':
            return (await axios.get(baseURL + '/' + endpoint + '?' + queryString + '&signature=' + signature)).data
    }
} 

awsLambda.comparePasswords = async function (pass1,pass2) {
    return await request('POST','comparePassword',null,{pass1,pass2})
}

awsLambda.getLocalAmountLimit = async function (currentManualRate,fullRateFromAPI) {
    return await request('POST','getLocalAmountLimit',null,{currentManualRate,fullRateFromAPI})
}

export default awsLambda;