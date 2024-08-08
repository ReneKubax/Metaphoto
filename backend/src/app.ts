import express from 'express';
import photoRoutes from './routes/photoRoutes';

const app = express();

app.use('/externalapi', photoRoutes);

export default app;
