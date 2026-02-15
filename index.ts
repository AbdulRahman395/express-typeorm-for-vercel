import dotenv from "dotenv";
dotenv.config();

import 'reflect-metadata';
import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';

import routes from './routes/index.routes';
import initializeDatabase from './config/database';

const app = express();

// Initialize database
initializeDatabase().catch(console.error);

// Serve static files from public directory
app.use(express.static('public'));

// CORS configuration
app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow non-browser requests (Flutter mobile, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }

    // Allow all localhost ports (Flutter Web, React dev)
    if (
      origin.startsWith('http://localhost') ||
      origin.startsWith('http://127.0.0.1')
    ) {
      return callback(null, true);
    }

    // Allow all Vercel deployments
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Your Todo API is up and running!');
});

app.use('/api/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`✅ Server is listening on port ${port}`);
});

// Vercel serverless function export
export default async function handler(req: Request, res: Response) {
  return app(req, res);
}
