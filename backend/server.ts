import express, { type Request, type Response } from 'express';
import cors from 'cors';
import {stockController} from  './src/controllers/stockController.js';


const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/hierarchical-stock', stockController.getHierarchicalStock);

app.listen(4000, ()=>{
    console.log('Backend Server running on port 4000 🚀');
});