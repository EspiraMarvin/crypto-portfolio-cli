#!/usr/bin/env node
const { program } = require("commander")
const {
  latestPortfolio,
  latestPortfolioGivenToken,
  findCount,
} = require("./index")

const { prompt } = require("inquirer")

// program.version("1.0.0").description("Porfolio Tracker CLI ")

// console.log("prgram", program.name)

const tokenQuestions = [
  { type: "input", name: "token", message: "Token Name (eg BTC or ETH)" },
]

program
  .command("latestwithtoken")
  .alias("lt")
  .description("Get the latest portfolio given a token")
  .action(() => {
    prompt(tokenQuestions).then((answers) => {
      console.log("latestPortfolio command called")
      latestPortfolioGivenToken(answers.token)
    })
  })

program
  .command("count")
  .alias("c")
  .description("Get the count of all records")
  .action(() => findCount())

program
  .command("latest")
  .alias("l")
  .description("Get the latest portfolio")
  .action(() => {
    console.log("latestPortfolio command called")
    latestPortfolio()
  })

// program
//   .command("get latest token <token>")
//   .alias("lt")
//   .description("Get the latest portfolio given a token")
//   .action((token) => {
//     console.log("latestPortfolioValueGivenToken command called")
//     latestPortfolioGivenToken(token)
//   })

// console.log("prgram", program)

program.parse(process.argv)
