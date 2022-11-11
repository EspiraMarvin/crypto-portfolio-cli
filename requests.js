const axios = require("axios")

const BASEURL = `https://min-api.cryptocompare.com`

const fetchTokenInUsd = async (token) => {
  const tokenUsd = await axios.get(
    `${BASEURL}/data/price?fsym=${token}&tsyms=USD&api_key=${process.env.CRYPTO_COMPARE_KEY}`
  )
  return tokenUsd.data.USD
}

// problem getting historical data on specific day from cryptocompare API
const fetchPortOnDate = async (date) => {
  const res =
    await axios.get`${BASEURL}/data/v2/histoday?fsym=ETH&tsym=USD&limit=20&toTs=1&api_key=${process.env.CRYPTO_COMPARE_KEY}`()
  // https://min-api.cryptocompare.com/data/daily/market/close

  console.log("res", res.data)
  return res
}

let btcAll,
  ethAll,
  xrpAll = {}

module.exports = { fetchTokenInUsd, fetchPortOnDate, btcAll, ethAll, xrpAll }
