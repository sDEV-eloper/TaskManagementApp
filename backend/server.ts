import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db';
import authRoutes from './routes/authRoute';
import taskRoutes from './routes/taskRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
