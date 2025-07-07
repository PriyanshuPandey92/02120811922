import express from 'express';
import shortenerRoutes from './api/v1/routes/shortnerRoutes.js';

export const app = express();
app.use(express.json());
app.use('/', shortenerRoutes);

