import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { connectDB } from './db/connectDB.js';
import userRouter from './routes/authRoutes.js';
import noteRouter from './routes/noteRoutes.js';
import './config/passport.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'https://note-app-six-pearl.vercel.app',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallbackSecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'lax'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', userRouter);
app.use('/api/notes', noteRouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect DB:", error.message);
    process.exit(1);
  }
};

startServer();
