import fs from 'fs';
import path from 'path';
import pool from './db.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function setupDatabase() {
  try {
    console.log('Reading schema.sql...');
    const sqlPath = path.join(__dirname, '../schema.sql');
    const fullSql = fs.readFileSync(sqlPath, 'utf8');

    // Aquí está el truco: separamos el archivo por los ";" 
    // y limpiamos los espacios vacíos
    const queries = fullSql
      .split(';')
      .map(query => query.trim())
      .filter(query => query.length > 0);

    console.log(`Executing ${queries.length} queries in Aiven...`);

    for (const query of queries) {
      await pool.query(query);
      console.log('✔ Sentencia ejecutada con éxito');
    }
    
    console.log('✅ Estructura de MANUM creada correctamente en la nube');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al crear las tablas:', err);
    process.exit(1);
  }
}

setupDatabase();