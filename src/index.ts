import express from 'express';
import userRoutes from './routes/userRoutes'

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});