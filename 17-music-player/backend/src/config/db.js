'use strict';

const mysql = require('mysql2/promise');
const env = require('./env');
const logger = require('./logger');

const pool = mysql.createPool({
  host: env.dbHost,
  port: env.dbPort,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
  connectionLimit: env.dbConnectionLimit,
  waitForConnections: true,
  queueLimit: 0
});

const query = async (sql, params = []) => {
  const [rows] = await pool.query(sql, params);
  return rows;
};

const testConnection = async () => {
  try {
    await query('SELECT 1 AS connected');
    logger.info('Database connection established');
  } catch (error) {
    logger.error('Database connection failed', { message: error.message });
    throw error;
  }
};

module.exports = {
  pool,
  query,
  testConnection
};
