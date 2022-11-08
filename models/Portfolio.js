const { Sequelize, DataTypes } = require("sequelize")
const db = require("../config/db")

const Portfolio = db.define(
  "portfolio",
  {
    time_stamp: {
      type: DataTypes.STRING,
      get() {
        return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
    }
    },
    transaction_type: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
  },
  { timestamps: false }
)

module.exports = Portfolio