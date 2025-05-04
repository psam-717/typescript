import express, { Request, Response } from 'express';
import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';
import connectDB from './config/mongodb';
import cookieParser from "cookie-parser"
import morgan from 'morgan';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(morgan('dev'))


const port = 3000;
app.use("/api/users", userRoutes)



const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
