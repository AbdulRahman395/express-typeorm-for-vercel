import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import initializeDatabase from "./config/database";

let server: any;

async function createServer() {
  if (server) return server;

  const app = express();

  // Ensure DB initializes once
  await initializeDatabase();

  // Static files
  app.use(express.static("public"));

  // CORS
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (
        origin.startsWith("http://localhost") ||
        origin.startsWith("http://127.0.0.1")
      ) {
        return callback(null, true);
      }

      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }));

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req: Request, res: Response) => {
    res.send("🚀 Todo API is running!");
  });

  server = app;
  return server;
}

export default async function handler(req: Request, res: Response) {
  const app = await createServer();
  return app(req, res);
}

if (!process.env.VERCEL) {
  createServer().then((app) => {
    app.listen(3000, () => {
      console.log("🚀 Local server ready on port 3000");
    });
  });
}
