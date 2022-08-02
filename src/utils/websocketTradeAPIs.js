import WebSocket from 'ws';
import { notifyChanges } from '../modules/sockets/sockets.coordinator'

// Binance BTC/USDT

let binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')

binanceSocket.onmessage = (event) => {
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
        data.sellPrice = binancePrice - profit
        data.sellLimit = binancePrice - limit
        data.buyPrice = binancePrice + profit
        data.buyLimit = binancePrice + limit
        data.realPrice = binancePrice
        
        // console.log('------------------------------------')
        // console.log('------------PRECIO BINANCE----------')
        // console.log('binancePrice: ',binancePrice)
        // console.log('profit: ',profit)
        // console.log('limit: ',limit)
        // console.log('---------VENTA--------')
        // console.log('data.sellPrice: ',data.sellPrice)
        // console.log('data.sellLimit: ',data.sellLimit)
        // console.log('---------COMPRA--------')
        // console.log('data.buyPrice: ',data.buyPrice)
        // console.log('data.buyLimit: ',data.buyLimit)
        // console.log('------------------------------------')
    }
    // console.log('BTC->USDT')
    // console.log(data)
    notifyChanges('binance_prices',data.route ? data : 'Server cannot get routes')
}

// KRAKEN BTC/USDT

let krakenSocket = new WebSocket('wss://ws.kraken.com')

krakenSocket.onopen = function(event) {
    console.log('Connected to: ' + event)

    krakenSocket.onclose = () => {
        console.log('KRAKEN WS CLOSED ')
    }

    krakenSocket.send(JSON.stringify({
        event: "subscribe",
        pair: [
        "BTC/USDT"
        ],
        subscription: {
            name: "trade" 
        }
    }))
};

krakenSocket.onmessage = (event) => {
    let data = {}
    let eventObj = JSON.parse(event.data)
    
    if (eventObj.event !== 'heartbeat') {
        data.api = true
        data.route = routes.find((r) => r.origin_country === "Kraken" && r.destiny_country === "Kraken" && r.origin_iso_code === 'BTC' && r.destiny_iso_code === 'USDT')
        data.reverseRoute = routes.find((r) => r.origin_country === "Kraken" && r.destiny_country === "Kraken" && r.origin_iso_code === 'USDT' && r.destiny_iso_code === 'BTC')
        

        if (data.route && eventObj[1]) {
            data.date = eventObj[1][eventObj[1].length - 1][2]
            data.date = parseInt(data.date)

            let krakenPrice = parseFloat(eventObj[1][eventObj[1].length - 1][0])
            let profit = krakenPrice * data.route.profit_margin / 100
            let limit = krakenPrice * data.route.percent_limit / 100
            data.sellPrice = krakenPrice - profit
            data.sellLimit = krakenPrice - limit
            data.buyPrice = krakenPrice + profit
            data.buyLimit = krakenPrice + limit
            data.realPrice = krakenPrice
            
            console.log('------------------------------------')
            console.log('------------PRECIO KRAKEN----------')
            console.log('krakenPrice: ',krakenPrice)
            console.log('profit: ',profit)
            console.log('limit: ',limit)
            console.log('---------VENTA--------')
            console.log('data.sellPrice: ',data.sellPrice)
            console.log('data.sellLimit: ',data.sellLimit)
            console.log('---------COMPRA--------')
            console.log('data.buyPrice: ',data.buyPrice)
            console.log('data.buyLimit: ',data.buyLimit)
            console.log('------------------------------------')
            notifyChanges('kraken_prices',data.route ? data : 'Server cannot get routes')
        }

        // console.log('BTC->USDT')
        // console.log('DATA: ',data)
    } else 
        console.log('KRAKEN WS: ',eventObj)
}