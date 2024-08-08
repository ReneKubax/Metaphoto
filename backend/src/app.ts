import express from 'express';
import cors from 'cors';
import photoRoutes from './routes/photoRoutes';

const app = express();

const corsOptions = {
  origin: ['http://localhost:3001', 'https://metaphoto-omega.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

app.use('/externalapi', photoRoutes);

export default app;
