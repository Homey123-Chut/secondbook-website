import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_Name,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

console.log("DB_name: ", process.env.DB_Name);
console.log("DB_USER: ", process.env.DB_USER);
console.log("DB_PASSWORD: ", process.env.DB_PASSWORD);
console.log("DB_HOST: ", process.env.DB_HOST);
console.log("Current working directory:", process.cwd());

export default sequelize;
