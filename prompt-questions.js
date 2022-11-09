// input token
const tokenQuestion = [
  {
    type: "input",
    name: "token",
    message: "Token Name (eg BTC or ETH or XRP)",
  },
]

// input date
const dateQuestion = [
  {
    type: "input",
    name: "time_stamp",
    message:
      "Enter date between (2019-10-25 - 1972-10-02) (format yyyy/mm/dd) ",
  },
]

// input token
const dateTokenQuestion = [
  {
    type: "input",
    name: "time_stamp",
    message:
      "Enter date between (2019-10-25 - 1972-10-02) (format yyyy/mm/dd) ",
  },
  {
    type: "input",
    name: "token",
    message: "Token Name (eg BTC or ETH or XRP)",
  },
]

module.exports = { tokenQuestion, dateQuestion, dateTokenQuestion }
