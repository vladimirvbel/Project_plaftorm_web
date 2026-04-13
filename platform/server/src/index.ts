import 'dotenv/config'; // <-- 1. IMPORTANTE: Carga el .env al principio
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import pool from './db.js';
import { OAuth2Client } from 'google-auth-library';

// Asegúrate de que el nombre en tu .env sea exactamente OAUTH_CLIENT_ID
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

const app = express();
const PORT = 3000;

app.use(cors()); // permite solicitudes desde el frontend
app.use(express.json());

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
// Forzamos a que TS sepa que 'token' viene como string
  const { token } = req.body as { token: string };

  if (!token) {
    return res.status(400).json({ error: 'Token no proporcionado' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID as string, // <--- SOLUCIÓN AQUÍ
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({ error: 'Payload de Google inválido' });
    }

    // Extraemos los datos del payload de Google
    const google_id = payload.sub;
    const name = payload.name || 'Usuario Plataforma';
    const email = payload.email || '';
    const picture = payload.picture || '';

    // 3. Insertar o actualizar usuario en Aiven
    // Usamos el google_id (sub) como llave única
    await pool.query(
      `INSERT INTO users (google_id, nombre, email, rol) 
       VALUES (?, ?, ?, 'alumno') 
       ON DUPLICATE KEY UPDATE nombre = ?, email = ?`,
      [google_id, name, email, name, email]
    );

    res.json({
      message: 'Usuario autenticado correctamente',
      user: { id: google_id, name, email, picture }
    });

  } catch (error) {
    console.error('❌ Error detallado de Auth:', error);
    res.status(500).json({ error: 'Fallo en la verificación con Google' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
});