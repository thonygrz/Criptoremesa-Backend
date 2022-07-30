import WebSocket from 'ws';
import { notifyChanges } from '../modules/sockets/sockets.coordinator'
import operationRoutesRepository from '../modules/operation_routes/repositories/operation_routes.pg.repository'

let ws = new WebSocket('wss://stream.binance.com:9443/ws/btceth@trade')
let ws2 = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')

let routes = []

if (routes.length === 0) {
    operationRoutesRepository.getoperation_routes().then((val) => {
        routes = val
    })
}

ws.onmessage = (event) => {
    let data = {}
    
    data.price = JSON.parse(event.data).p
    data.api = true
    data.route = routes.find((r) => r.origin_country === "Binance" && r.destiny_country === "Binance" && r.origin_iso_code === 'BTC' && r.destiny_iso_code === 'ETH')

    console.log('BTC->ETH')
    console.log(data)
    notifyChanges('btc_eth_price',data.route ? data : 'Server cannot get routes')
}

ws2.onmessage = (event) => {
    let data = {}
    
    data.price = JSON.parse(event.data).p
    data.api = true
    data.route = routes.find((r) => r.origin_country === "Binance" && r.destiny_country === "Binance" && r.origin_iso_code === 'BTC' && r.destiny_iso_code === 'USDT')
    data.reverseRoute = routes.find((r) => r.origin_country === "Binance" && r.destiny_country === "Binance" && r.origin_iso_code === 'USDT' && r.destiny_iso_code === 'BTC')

    console.log('BTC->USDT')
    console.log(data)
    notifyChanges('btc_usdt_price',data.route ? data : 'Server cannot get routes')
}

export default ws;