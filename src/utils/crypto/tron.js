import axios from 'axios'

const getTransactionByTxId = async (txid) => {
    return axios.get(`https://apilist.tronscan.org/api/transaction-info?hash=${txid}`)
}

export default {
    getTransactionByTxId
};