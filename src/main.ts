import { authMiddleware } from './middleware/auth';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import loginRouter from './routes/login';
import registerRouter from './routes/register';
import dataRouter from './routes/data';
import notesRouter from './routes/notes';
import issuesRouter from './routes/issues';

// Create an express app
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

// CORS
const corsOptions = {
  origin: '*',
  preflightContinue: false,
  credentials: true,
  methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

//public routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// protected routes
app.use(authMiddleware);
app.use('/data', dataRouter);
app.use('/notes', notesRouter);
app.use('/issues', issuesRouter);

app.set('port', process.env.PORT || 9000);
//Start Server
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit();
});
