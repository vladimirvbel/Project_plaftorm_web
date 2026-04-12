import { createPool } from 'mysql2/promise'; // Cambiamos a importación nombrada
import dotenv from 'dotenv';

dotenv.config();

// Creamos el pool asegurando que los valores no sean undefined
const pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'defaultdb',
  ssl: {
    rejectUnauthorized: false // Obligatorio para Aiven
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;