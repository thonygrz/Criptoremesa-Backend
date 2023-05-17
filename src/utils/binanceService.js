import { env } from '../utils/enviroment'
import axios from 'axios'
import crypto, { sign } from 'crypto'

// let client = new Spot(apiKey, apiSecret)

// // provide the testnet base url
// let client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision'})

let client = {}

const apiKey = env.BINANCE_API_KEY
const apiSecret = env.BINANCE_SECRET_KEY
const baseURL = 'https://api.binance.com/api/v3'

async function request(method,endpoint,queryString,data) {
    let signature = crypto.createHmac('sha256',apiSecret).update(queryString).digest('hex')

    axios.defaults.headers.common['X-MBX-APIKEY'] = apiKey
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    
    switch (method) {
        case 'POST':
            return (await axios.post(baseURL + '/' + endpoint + '?' + queryString + '&signature=' + signature)).data
        case 'GET':
            return (await axios.get(baseURL + '/' + endpoint + '?' + queryString + '&signature=' + signature)).data
    }
} 

client.getAccountInfo = async function () {
    let query = `timestamp=${Date.now()}`

    return await request('GET','account',query)
}

client.newOrder = async function (data) {
    try {
        let query = `symbol=${data.symbol}&side=${data.side}&type=${data.type}&timeInForce=${data.timeInForce}&quantity=${data.quantity}&price=${data.price}&timestamp=${Date.now()}`
    
        return await request('POST','order',query,{})
    } catch (error) {
        if (error.response.data.msg === 'Account has insufficient balance for requested action.') {
            return {
                        status: 'NO_FUNDS',
                        message: error.response.data.msg
                    }
        }
        throw error
    }
}

client.myTrades = async function () {
    // Place a new order
    const resp = await  client.allOrders('BTCUSDT')
    client.logger.log(resp.data)
    return resp.data
}

export default client;