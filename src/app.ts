import express, { Application, Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';

import routes from './routes';

dotenvFlow.config();

// Create Express Application
const app: Application = express();

app.use('/api', routes);

// Middleware
export function startServer() {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, function() {
        console.log(`Server is running on port ${PORT}`);
    });
}
