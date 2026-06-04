

import express, { type Request, type Response } from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors()); // 프론트엔드 접속 허용
app.use(express.json());

const PORT = process.env.PORT || 4000;

// DB 커넥션 풀
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

app.get('/api/test', async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT "DB 연결 성공" as message');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'DB 연결 실패' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


