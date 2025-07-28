import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/connectDB.js';
import userRouter from './routes/authRoutes.js';
import noteRouter from './routes/noteRoutes.js';

const app = express();

dotenv.config();
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', userRouter);
app.use('/api/notes', noteRouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect DB:", error.message);
    process.exit(1);
  }
};

startServer();
