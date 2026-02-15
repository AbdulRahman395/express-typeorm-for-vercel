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
import AppDataSource from './config/data-source';

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

// Health check endpoint
app.get('/health', async (req: Request, res: Response) => {
    try {
        const startTime = Date.now();
        
        // Check database connection
        const dbStatus = AppDataSource.isInitialized ? 'connected' : 'disconnected';
        let dbResponseTime = 0;
        
        if (AppDataSource.isInitialized) {
            const dbStartTime = Date.now();
            await AppDataSource.query('SELECT 1');
            dbResponseTime = Date.now() - dbStartTime;
        }
        
        const responseTime = Date.now() - startTime;
        
        const health = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            responseTime: `${responseTime}ms`,
            database: {
                status: dbStatus,
                responseTime: dbStatus === 'connected' ? `${dbResponseTime}ms` : 'N/A'
            },
            environment: process.env.NODE_ENV || 'unknown',
            version: process.env.npm_package_version || '1.0.0',
            memory: {
                used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
                total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`
            }
        };
        
        // Return 200 if database is connected, 503 if not
        const statusCode = dbStatus === 'connected' ? 200 : 503;
        res.status(statusCode).json(health);
        
    } catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            error: 'Database connection failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
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
