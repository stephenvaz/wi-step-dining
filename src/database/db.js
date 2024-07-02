import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  connectionLimit: 2,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

const db  = mysql.createPool(
  dbConfig
);

export default db;
