import pool from './db.js';

async function seed() {
  try {
    console.log('🌱 Sembrando datos completos de prueba...');

    // 1. Insertar o recuperar el Instructor
    const [userResult]: any = await pool.query(
      `INSERT INTO users (google_id, nombre, email, rol) 
       VALUES (?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
      ['test_google_001', 'Artesano Maestro', 'maestro@manum.com', 'instructor']
    );
    const instructorId = userResult.insertId;

    // 2. Insertar el Curso y obtener su ID
    const [courseResult]: any = await pool.query(
      `INSERT INTO courses (titulo, descripcion, precio, instructor_id, categoria) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        'Costura Básica: Máquina de Pedal',
        'Aprende a dominar la máquina clásica desde cero.',
        450.00,
        instructorId,
        'Costura'
      ]
    );
    // Esta es la clave: aquí guardamos el ID del curso recién creado
    const courseId = courseResult.insertId;

    // 3. Insertar la Lección ligada a ese curso
    await pool.query(
      `INSERT INTO lessons (course_id, titulo, contenido_url, orden) 
       VALUES (?, ?, ?, ?)`,
      [
        courseId, // Usamos el ID que capturamos arriba
        'Introducción y Partes de la Máquina',
        'https://cloudinary.com/v123/intro-video',
        1
      ]
    );

    console.log('✅ Instructor, Curso y Lección insertados con éxito');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al sembrar datos:', err);
    process.exit(1);
  }
}

seed();