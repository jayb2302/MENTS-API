import express, { Application, Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';
import cors from 'cors';
import routes from './routes';
import { testConnection, connect } from './repository/database';

dotenvFlow.config();

// Create Express Application
const app: Application = express();

// Enable CORS for all requests
app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
  })
);

app.use(cors());

// Middleware
export function startServer() {
  app.use(express.json());
  // Bind routes to the app
  app.use('/api', routes);

  testConnection();
  // connect();
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
  });
}
