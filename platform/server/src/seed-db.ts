import pool from './db.js';

async function seed() {
  try {
    console.log('🌱 Sembrando datos de prueba...');

    // 1. Insertar un instructor
    const [userResult]: any = await pool.query(
      `INSERT INTO users (google_id, nombre, email, rol) 
       VALUES (?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
      ['test_google_001', 'Artesano Maestro', 'maestro@manum.com', 'instructor']
    );

    const instructorId = userResult.insertId;

    // 2. Insertar un curso ligado a ese instructor
    await pool.query(
      `INSERT INTO courses (titulo, descripcion, precio, instructor_id, categoria) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        'Costura Básica: Máquina de Pedal',
        'Aprende a dominar la máquina clásica desde cero para tus primeros proyectos.',
        450.00,
        instructorId,
        'Costura'
      ]
    );

    console.log('✅ Datos insertados con éxito');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al sembrar datos:', err);
    process.exit(1);
  }
}

seed();