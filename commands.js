#!/usr/bin/env node
const { program } = require("commander")
const {
  latestPortfolio,
  latestPortfolioGivenToken,
  portfolioValueOnDate,
  portfolioValueOnDateAndToken,
} = require("./index")
const {
  dateQuestion,
  tokenQuestion,
  dateTokenQuestion,
} = require("./prompt-questions")

const { prompt } = require("inquirer")

program.version("1.0.0").description("Porfolio Tracker CLI ")

program
  .command("latest-portfolio")
  .alias("lp")
  .description("Get the latest portfolio")
  .action(() => {
    latestPortfolio()
  })

program
  .command("latest-portfolio-given-token")
  .alias("lpt")
  .description("Get the latest portfolio given a token")
  .action(() => {
    prompt(tokenQuestion).then((answers) => {
      latestPortfolioGivenToken(answers)
    })
  })

program
  .command("portfolio-given-date")
  .alias("pd")
  .description("Get portfolio value on a given date")
  .action(() => {
    prompt(dateQuestion).then((answers) => {
      console.log("answers", answers)
      portfolioValueOnDate(answers)
    })
  })

program
  .command("portfolio-given-date-and-token")
  .alias("pdt")
  .description("Get portfolio value on a given date and token")
  .action(() => {
    prompt(dateTokenQuestion).then((answers) => {
      portfolioValueOnDateAndToken(answers)
    })
  })


program.parse(process.argv)
