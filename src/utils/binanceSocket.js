import WebSocket from 'ws';
import { notifyChanges } from '../modules/sockets/sockets.coordinator'

let ws = new WebSocket('wss://stream.binance.com:9443/ws/btceth@trade')
let ws2 = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')

// PRUEBA KRAKEN

// let ws3 = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')

ws.onmessage = (event) => {
    let data = {}
    
    data.price = JSON.parse(event.data).p
    data.api = true
    data.route = routes.find((r) => r.origin_country === "Binance" && r.destiny_country === "Binance" && r.origin_iso_code === 'BTC' && r.destiny_iso_code === 'ETH')

    // console.log('BTC->ETH')
    // console.log(data)
    // notifyChanges('btc_eth_price',data.route ? data : 'Server cannot get routes')
}

ws2.onmessage = (event) => {
    let data = {}
    
    data.api = true
    // data.date = JSON.parse(event.data).T
    data.date = JSON.parse(event.data).T
    data.route = routes.find((r) => r.origin_country === "Binance" && r.destiny_country === "Binance" && r.origin_iso_code === 'BTC' && r.destiny_iso_code === 'USDT')
    data.reverseRoute = routes.find((r) => r.origin_country === "Binance" && r.destiny_country === "Binance" && r.origin_iso_code === 'USDT' && r.destiny_iso_code === 'BTC')
    
    if (data.route) {
        let binancePrice = parseFloat(JSON.parse(event.data).p)
        let profit = binancePrice * data.route.profit_margin / 100
        let limit = binancePrice * data.route.percent_limit / 100
        let revBinancePrice = binancePrice
        let revProfit = revBinancePrice * data.route.profit_margin / 100
        let revLimit = revBinancePrice * data.route.percent_limit / 100
        data.sellPrice = binancePrice - profit
        data.sellLimit = binancePrice - limit
        data.buyPrice = revBinancePrice + revProfit
        data.buyLimit = binancePrice + revLimit
        data.realPrice = binancePrice

        // console.log('------------------------------------')
        // console.log('------------PRECIO BINANCE----------')
        // console.log('binancePrice: ',binancePrice)
        // console.log('---------VENTA--------')
        // console.log('profit: ',profit)
        // console.log('limit: ',limit)
        // console.log('data.sellPrice: ',data.sellPrice)
        // console.log('data.sellLimit: ',data.sellLimit)
        // console.log('---------COMPRA--------')
        // console.log('revProfit: ',revProfit)
        // console.log('revLimit: ',revLimit)
        // console.log('data.buyPrice: ',data.buyPrice)
        // console.log('data.buyLimit: ',data.buyLimit)
    }
    // console.log('BTC->USDT')
    // console.log(data)
    notifyChanges('btc_usdt_price',data.route ? data : 'Server cannot get routes')
}

// PRUEBA KRAKEN

// ws3.onmessage = (event) => {
//     let data = {}
    
//     data.price = JSON.parse(event.data).p
//     data.api = true
//     data.route = routes.find((r) => r.origin_country === "Binance" && r.destiny_country === "Binance" && r.origin_iso_code === 'BTC' && r.destiny_iso_code === 'ETH')

//     // console.log('BTC->ETH')
//     // console.log(data)
//     // notifyChanges('btc_eth_price',data.route ? data : 'Server cannot get routes')
// }

export default ws;