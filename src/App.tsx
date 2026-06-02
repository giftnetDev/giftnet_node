import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

const pool= mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections :true,
    connectionLimit: 10,
});

app.get('/api/test', async(req, res)=> {
    try {
        const [rows] = await pool.query('SELECT "DB 연걸 성공!" as message');
        res.json(rows);

      }
      catch (error) {
        console.error(error);
        res.status(500).json({error: 'DB 접속 실패'});
      }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});



