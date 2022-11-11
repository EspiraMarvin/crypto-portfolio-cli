const db = require("./config/db")
const { fetchTokenInUsd, fetchPortOnDate } = require("./requests")

// 1. Given no parameters, return the latest portfolio value per token in USD

const latestPortfolio = async () => {
  try {
    const res = await db.query(
      `SELECT token, SUM(amount) as total_amount, transaction_type from portfolios GROUP BY token, transaction_type`
    )

    const [btcUsd, ethUsd, xrpUsd] = await Promise.all([
      fetchTokenInUsd("BTC"),
      fetchTokenInUsd("ETH"),
      fetchTokenInUsd("XRP"),
    ])

    let btcAll,
      ethAll,
      xrpAll = {}

    res[0].filter((item) => {
      if (item.token === "BTC" && item.transaction_type === "WITHDRAWAL")
        btcAll.withdrawal = item.total_amount * btcUsd
      if (item.token === "BTC" && item.transaction_type === "DEPOSIT")
        btcAll.deposit = item.total_amount * btcUsd
      if (item.token === "ETH" && item.transaction_type === "WITHDRAWAL")
        ethAll.withdrawal = item.total_amount * ethUsd
      if (item.token === "ETH" && item.transaction_type === "DEPOSIT")
        ethAll.deposit = item.total_amount * ethUsd
      if (item.token === "XRP" && item.transaction_type === "WITHDRAWAL")
        xrpAll.withdrawal = item.total_amount * xrpUsd
      if (item.token === "XRP" && item.transaction_type === "DEPOSIT")
        xrpAll.deposit = item.total_amount * xrpUsd
    })

    // get the diff
    btcAll.diff = btcAll.deposit - btcAll.withdrawal
    ethAll.diff = ethAll.deposit - ethAll.withdrawal
    xrpAll.diff = xrpAll.deposit - xrpAll.withdrawal

    // console.log("lastest portfolio", res[0])
    console.log("latestPortfolio BTC ", btcAll)
    console.log("latestPortfolio ETH ", ethAll)
    console.log("latestPortfolio XRP ", xrpAll)

    process.exit(0)
  } catch (error) {
    process.exit(1)
  }
}

// 2. Given a token, return the latest portfolio value for that token in USD

const latestPortfolioGivenToken = async ({ token }) => {
  try {
    let searchToken = token.toUpperCase()
    const res = await db.query(
      `SELECT SUM(amount) as total_amount, transaction_type from portfolios WHERE token='${searchToken}' GROUP BY transaction_type`
    )
    let tokenAll = {}
    const tokenUsd = await fetchTokenInUsd(token)

    res[0].filter((item) => {
      if (item.transaction_type === "DEPOSIT") {
        tokenAll.deposit = item.total_amount * tokenUsd
      } else {
        tokenAll.withdrawal = item.total_amount * tokenUsd
      }
    })
    tokenAll.diff = tokenAll.deposit - tokenAll.withdrawal

    console.log(`latestPortfolio for ${token}`, tokenAll)

    process.exit(0)
  } catch (error) {
    process.exit(1)
  }
}

// 3. Given a date, return the portfolio value per token in USD on that date

const portfolioValueOnDate = async ({ time_stamp }) => {
  try {
    if (time_stamp > "2019-10-25" || time_stamp < "1972-10-02") process.exit(1)
    let searchDate = Math.floor(new Date(time_stamp).getTime() / 1000)
    const res = await db.query(
      `SELECT SUM(amount) as total_amount, token ,transaction_type from portfolios WHERE time_stamp <= '${searchDate}' GROUP BY token, transaction_type`
    )

    console.log("portfolioValueOnDate results ", res[0])
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// 4. Given a date and a token, return the portfolio value of that token in USD on that date

const portfolioValueOnDateAndToken = async ({ time_stamp, token }) => {
  try {
    if (time_stamp > "2019-10-25" || time_stamp < "1972-10-02") process.exit(1)
    let searchToken = token.toUpperCase()
    let searchDate = Math.floor(new Date(time_stamp).getTime() / 1000)
    const res = await db.query(
      `SELECT SUM(amount) as total_amount, transaction_type from portfolios WHERE time_stamp <= '${searchDate}' AND token = '${searchToken}' GROUP BY transaction_type`
    )

    let tokenAll = {}
    const tokenUsd = await fetchTokenInUsd(token)

    res[0].filter((item) => {
      if (item.transaction_type === "DEPOSIT") {
        tokenAll.deposit = item.total_amount * tokenUsd
      } else {
        tokenAll.withdrawal = item.total_amount * tokenUsd
      }
    })
    tokenAll.diff = tokenAll.deposit - tokenAll.withdrawal

    console.log(`latestPortfolio for ${token}`, tokenAll)
    process.exit(0)
  } catch (error) {
    process.exit(1)
  }
}

module.exports = {
  latestPortfolio,
  latestPortfolioGivenToken,
  portfolioValueOnDate,
  portfolioValueOnDateAndToken,
}
