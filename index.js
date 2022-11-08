const Portfolio = require("./models/Portfolio")
const { Sequelize } = require("sequelize")
const chalk = require("chalk")
const boxen = require("boxen")

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
  backgroundColor: "#555555",
}

//Given no parameters, return the latest portfolio value per token in USD
const latestPortfolio = async () => {
  const res = await Portfolio.max("time_stamp", {
    // attributes:['time_stamp', 'token', 'transaction_type', 'amount'],
    // group: ["time_stamp"],
  })
  console.log("latestPortfolio results", res)
  process.exit()
}
// latestPortfolio()

// Given a token, return the latest portfolio value for that token in USD
const latestPortfolioGivenToken = async (token) => {
  let searchToken = token.toUpperCase()
  const res = await Portfolio.findOne({
    attributes: [Sequelize.fn("max", Sequelize.col("time_stamp"))],
    where: { token: searchToken },
  })
  console.log("latestPortfolioValueGivenToken results", res.dataValues)
  process.exit()
}

async function findMe() {
  const res = await Portfolio.findOne({
    where: { time_stamp: "1571967208" },
  })
  console.log("portfolio results", res.dataValues)
}
// findMe()

const findCount = async () => {
  const count = await Portfolio.count()
  const msgBox = boxen(chalk.white.bold(count), boxenOptions)
  console.log(msgBox)
  process.exit()
}

// findCount()

async function getLatestPortfolio() {
  const res = await Portfolio.findAll({
    where: {
      attributes: [[Sequelize.fn("max", Sequelize.col("time_stamp")), "max"]],
    },
  })
  console.log("portfolio results", res.dataValues)
}

// getLatestPortfolio()

module.exports = {
  latestPortfolio,
  latestPortfolioGivenToken,
  findCount,
}
