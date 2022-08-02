const { Sequelize } = require('sequelize');

const dotenv = require("dotenv")
dotenv.config({
  path: "./config.env"
})
export const sequelize = new Sequelize({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    port: 5432,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
    } 
})

