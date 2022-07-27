import axios from 'axios'

const getTransactionByTxId = async (txid) => {
    return axios.get(`https://chain.api.btc.com/v3/tx/${txid}?verbose=3`)
}

export default {
    getTransactionByTxId
};