import 'dotenv/config'; // <-- 1. IMPORTANTE: Carga el .env al principio
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import pool from './db.js';
import { OAuth2Client } from 'google-auth-library';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Asegúrate de que el nombre en tu .env sea exactamente OAUTH_CLIENT_ID
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);
const app = express();
const PORT = process.env.PORT || 3000; // Render usará process.env.PORT

// --- 1. CONFIGURACIONES GLOBALES (SIEMPRE PRIMERO) ---
app.use(cors({
  // Debes tener AMBAS: la de tu PC para seguir probando y la de Vercel para la nube
  origin: [
    'http://localhost:5173',
    'https://manum-web.vercel.app' // <--- TU URL DE VERCEL AQUÍ
  ],
  credentials: true
})); // permite solicitudes desde el frontend
app.use(express.json());


// 2. Configuración de Cloudinary multimedia (Imagenes, Videos y PDFs)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string
});

// 2.1 Configuración de Multer (Almacenamiento temporal en memoria)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- 3. RUTAS ---

// RUTA: Crear Curso (CORREGIDA)
app.post('/api/courses', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { titulo, precio, categoria, descripcion, instructor_id } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'Falta la imagen' });

    // Subida a Cloudinary
    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "portadas" }, (err, res) => {
        if (err) reject(err); else resolve(res);
      });
      stream.end(file.buffer);
    });

    // SQL LIMPIO: 6 columnas y 6 valores exactos
    const sql = 'INSERT INTO courses (titulo, descripcion, precio, instructor_id, imagen_url, categoria) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [titulo, descripcion, precio, instructor_id, result.secure_url, categoria];

    await pool.query(sql, values);

    res.json({ message: 'Curso creado con éxito' });
  } catch (error: any) {
    console.error("ERROR SQL:", error.sqlMessage);
    res.status(500).json({ error: error.sqlMessage });
  }
});


// API para obtener todos los cursos
app.get('/api/courses', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courses');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener cursos' });
  }
});


// API para Login con Google
// 2. Añadimos los tipos : Request y : Response aquí:
app.post('/api/auth/google', async (req: Request, res: Response) => {
  const { token } = req.body as { token: string };

  if (!token) {
    return res.status(400).json({ error: 'Token no proporcionado' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID as string,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ error: 'Payload de Google inválido' });
    }

    const google_id = payload.sub;
    const name = payload.name || 'Usuario';
    const email = payload.email || '';
    const picture = payload.picture || '';

    // 1. Insertamos o actualizamos al usuario
    await pool.query(
      `INSERT INTO users (google_id, nombre, email, rol) 
       VALUES (?, ?, ?, 'alumno') 
       ON DUPLICATE KEY UPDATE nombre = ?, email = ?`,
      [google_id, name, email, name, email]
    );

    // 2. ⚡ UNA SOLA CONSULTA para obtener los datos reales de la DB
    // Esto nos da el ID numérico (1, 2, 3...) y el ROL actual (alumno/instructor)
    const [rows]: any = await pool.query(
      'SELECT id, rol FROM users WHERE google_id = ?',
      [google_id]
    );

    const dbUser = rows[0];

    // 3. Enviamos la respuesta al frontend
    res.json({
      message: 'Usuario autenticado correctamente',
      user: {
        id: dbUser.id,      // ID interno de Aiven (numérico)
        name,
        email,
        picture,
        rol: dbUser.rol     // Rol real ('instructor' o 'alumno')
      }
    });

  } catch (error) {
    console.error('❌ Error de Auth:', error);
    res.status(500).json({ error: 'Fallo en la verificación' });
  }
});



// 3. NUEVA RUTA: Subir lección (Imagen, Video o PDF)
app.post('/api/lessons/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const { curso_id, titulo, tipo } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'No se subió ningún archivo' });

    // Enviar a Cloudinary usando un "buffer" (los datos en memoria)
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto", // Detecta automáticamente si es video, pdf o imagen
          folder: "lecciones_artesania"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });

    const cloudinaryResult = result as any;

    // 4. Guardar en la base de datos de Aiven
    await pool.query(
      `INSERT INTO lecciones (curso_id, titulo, tipo, url_contenido) 
       VALUES (?, ?, ?, ?)`,
      [curso_id, titulo, tipo, cloudinaryResult.secure_url]
    );

    res.json({
      message: 'Material subido con éxito',
      url: cloudinaryResult.secure_url
    });

  } catch (error) {
    console.error('Error al subir material:', error);
    res.status(500).json({ error: 'Fallo al procesar el archivo' });
  }
});

// A. RUTA PARA OBTENER UN SOLO CURSO POR ID
app.get('/api/courses/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows]: any = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    
    res.json(rows[0]); // Devolvemos solo el objeto del curso
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
});

// B. RUTA PARA OBTENER LAS LECCIONES DE UN CURSO
app.get('/api/courses/:id/lessons', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM lecciones WHERE curso_id = ?', [id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las lecciones' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});