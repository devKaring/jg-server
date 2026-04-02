import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello JWT Auth Server');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});