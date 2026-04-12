import express, { type Request, type Response } from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = 3000;

app.use(cors()); // Permite peticiones desde el frontend
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

app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
});