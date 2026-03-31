import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes'

import pool from './config/db';


const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.get('/api/health', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS result');
    res.json({
      status: 'ok',
      db: rows,
    });
  } catch (error) {
    console.error('DB 연결 오류:', error);
    res.status(500).json({
      status: 'error',
      message: 'DB 연결 실패',
    });
  }
});

app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});