import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import expenseRoutes from './routes/expenseRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import authRoutes from './routes/authRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import stocksRoutes from './routes/stocksRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({ message: 'Personal Finance API is running healthy', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/stocks', stocksRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
