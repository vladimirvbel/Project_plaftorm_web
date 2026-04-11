// Añadimos la palabra "type" antes de Request y Response
import express, { type Request, type Response } from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor de Plataforma funcionando en 2026 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});