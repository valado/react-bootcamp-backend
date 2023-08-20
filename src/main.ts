import { authMiddleware } from './middleware/auth';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import helmet from 'helmet';
const cookieParser = require('cookie-parser');

import loginRouter from './routes/login';
import registerRouter from './routes/register';
import dataRouter from './routes/data';
import notesRouter from './routes/notes';

// Create an express app
const app = express();
app.use(helmet());
app.use(bodyParser.json({ extended: true }));
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

app.set('port', process.env.PORT || 9000);
//Start Server
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
