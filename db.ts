import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

dotenv.config();

export const db = new Sequelize(
  process.env.DB_NAME ?? '',
  process.env.DB_USER ?? '',
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2,
  }
);
