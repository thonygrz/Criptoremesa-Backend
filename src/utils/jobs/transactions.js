import cron from 'node-cron'
import tronAPI from '../crypto/tron'
import bitcoinAPI from '../crypto/bitcoin'
import { logger } from "../logger";

const timeSec = 10
const timeMin = 10

let txid

let setTxid = (newTxid,type) => {
    console.log("🚀 ~ setTxid txid", newTxid)
    txid = newTxid
    if (type === 'Tron') 
        validateTronTransaction.start()
    if (type === 'Bitcoin') 
    validateBitcoinTransaction.start()
}

let getTxid = () => {
    return txid
}

let validateTronTransaction = cron.schedule(`*/${timeSec} * * * * *`, async () => {
    let currentTxid = getTxid()

    let confNum = (await tronAPI.getTransactionByTxId(currentTxid)).data.srConfirmList.length
    console.log('job running ',currentTxid)
    console.log('Confirmations number: ', confNum)
    // if (confNum >= 100000000)
    //     validateTronTransaction.stop()

    // if ((await tronAPI.getTransactionByTxId(currentTxid)).data.hash === '34ba36002c364e4a46e781ebf087d2e38b4c07a948bdfe25eaa05b8f39a33198')
    //     validateTronTransaction.stop()
}, {
  scheduled: false
});

let validateBitcoinTransaction = cron.schedule(`*/${timeSec} * * * * *`, async () => {
    let confNum = (await bitcoinAPI.getTransactionByTxId(getTxid())).data.data.confirmations
    console.log('job running ',getTxid())
    console.log('Confirmations number: ', confNum)
    if (confNum >= 3)
    validateBitcoinTransaction.stop()
}, {
  scheduled: false
});

export default {
    validateTronTransaction,
    validateBitcoinTransaction,
    setTxid
};