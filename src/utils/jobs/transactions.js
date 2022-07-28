import cron from 'node-cron'
import tronAPI from '../crypto/tron'
import bitcoinAPI from '../crypto/bitcoin'
import { logger } from "../logger";
import exchangesPGRepository from '../../modules/exchanges/repositories/exchanges.pg.repository'

const timeSec = 10
const timeMin = 10

cron.schedule(`*/${timeSec} * * * * *`, async () => {
    let unconfirmedTransactions = await exchangesPGRepository.getUnconfirmedTransactions()
    let unconfirmedTransactionsIds = unconfirmedTransactions.map(u => u.id_exchange)
    
    if (unconfirmedTransactions.length === 0) unconfirmedTransactionsIds = '👎';
    logger.debug(`Transactions ids: ${unconfirmedTransactionsIds} / Every ${timeSec} seconds.`);
    
    if (unconfirmedTransactionsIds !== '👎') {
        let confNum
        let validTxid
        for (const transaction of unconfirmedTransactions) {
            validTxid = false
            if (transaction.nameCurrency === 'USDT') {
                let USDTtransf = (await tronAPI.getTransactionByTxId(transaction.confirmationNumber)).data
                confNum = USDTtransf.srConfirmList.length
                
                if (USDTtransf.hash === transaction.confirmationNumber && USDTtransf.tokenTransferInfo.to_address === transaction.wallet)
                validTxid = true
            }
            else if (transaction.nameCurrency === 'BTC') {
                let BTCtransf = (await bitcoinAPI.getTransactionByTxId(transaction.confirmationNumber)).data
                confNum = BTCtransf.data.outputs.length

                let transactionWithDestinyAddress = BTCtransf.data.outputs.find(el=> el.addresses.find(ad=>ad === transaction.wallet))

                if (BTCtransf.data && transactionWithDestinyAddress)
                    validTxid = true
            }

            if (confNum >= 3 && validTxid) {
                let confirmResp = await exchangesPGRepository.confirmTransaction(transaction.id_exchange)

                if (!confirmResp.error)
                    logger.debug(confirmResp);
                else
                    logger.error(confirmResp.message + ' -- ' + confirmResp.error);
            }
        }
    }
});

export default cron;