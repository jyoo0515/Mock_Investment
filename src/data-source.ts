import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC == 'true',
  logging: true,
  entities: [__dirname + '/entity/*.{ts,js}'],
  migrations: [__dirname + '/migration/*.{ts,js}'],
});

export default AppDataSource;
