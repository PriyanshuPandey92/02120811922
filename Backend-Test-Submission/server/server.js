import express from 'express';
import dotenv from 'dotenv';
import { app } from './src/app.js';
dotenv.config();

app.use(express.json());

app.listen(process.env.PORT || 5001, ()=>{
    `Server is Up and Running on ${process.env.PORT || 5001}`;
});
