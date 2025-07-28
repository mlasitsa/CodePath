// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes';

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/api', postRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
