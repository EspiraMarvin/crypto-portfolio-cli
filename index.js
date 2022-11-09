const db = require("./config/db")

// 1. Given no parameters, return the latest portfolio value per token in USD

const latestPortfolio = async () => {
  const res = await db.query(
    `SELECT token, SUM(amount) as total_amount, transaction_type from portfolios GROUP BY token, transaction_type`
  )
  console.log("lastest portfolio", res[0])
  process.exit(0)
}

// 2. Given a token, return the latest portfolio value for that token in USD

const latestPortfolioGivenToken = async ({ token }) => {
  let searchToken = token.toUpperCase()
  const res = await db.query(
    `SELECT SUM(amount) as total_amount, transaction_type from portfolios WHERE token='${searchToken}' GROUP BY transaction_type`
  )
  console.log("latestPortfolioValueGivenToken results ", res[0])
  process.exit(0)
}

// 3. Given a date, return the portfolio value per token in USD on that date

const portfolioValueOnDate = async ({ time_stamp }) => {
  let searchDate = Math.floor(new Date(time_stamp).getTime() / 1000)
  const res = await db.query(
    `SELECT SUM(amount) as total_amount, transaction_type from portfolios WHERE time_stamp <= '${searchDate}' GROUP BY transaction_type`
  )
  console.log("portfolioValueOnDate results ", res[0])
  process.exit(0)
}

// 4. Given a date and a token, return the portfolio value of that token in USD on that date

const portfolioValueOnDateAndToken = async ({ time_stamp, token }) => {
  if (token > "2019-10-25" || token < "1972-10-02") process.exit(1)
  let searchToken = token.toUpperCase()
  let searchDate = Math.floor(new Date(time_stamp).getTime() / 1000)
  const res = await db.query(
    `SELECT SUM(amount) as total_amount, transaction_type from portfolios WHERE time_stamp <= '${searchDate}' AND token = '${searchToken}' GROUP BY transaction_type`
  )
  console.log("portfolioValueOnDate results ", res[0])
  process.exit(0)
}

module.exports = {
  latestPortfolio,
  latestPortfolioGivenToken,
  portfolioValueOnDate,
  portfolioValueOnDateAndToken,
}
