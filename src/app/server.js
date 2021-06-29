import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { logger } from '../utils/logger';
import { env } from '../utils/enviroment';
import routerIndex from '../routes/index.routes';

// SETTINGS
const app = express();
app.set('port', env.PORT || 3000);

// MIDDLEWARES
app.use(morgan("dev", { "stream": logger.stream }));
app.use(json());
app.use(cors({
    "origin": "*",
    "methods": "GET,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use(helmet());

// ROUTES
app.get('/', async (req, res) => {
    res.status(200).send("Server running");
});
app.use('/cg', routerIndex);

// ERROR HANDLER
app.use(function(err, req, res, next) {
    logger.error(err.message);
    res.status(500).send({ error: "SERVER_ERROR", message: err.message });
});

export default app;