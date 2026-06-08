import express, { type Request, type Response } from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors()); // 프론트엔드 접속 허용
app.use(express.json());

const PORT = process.env.PORT || 4000;

// db 객체(Connection Pool) 선언
const db = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database: process.env.DB_NAME,
    port : Number(3306),
    waitForConnections: true,
    connectionLimit:10,
    queueLimit:0
});

db.getConnection()
    .then(conn =>{
        console.log('✅ MariaDB 연결 성공!');
        conn.release();
    })
    .catch(err =>{
        console.error('❌ DB 연결 실패:', err);
    });

app.get('/api/ring-buffer', async (req: Request, res: Response) =>{
    try{
        //DB에서 전체 데이터 조회 (최신 ID 순)
        const [rows] = await db.query('SELECT * FROM T_ST_EXP_RING_BUFFER ORDER BY ID DESC');
        res.json(rows);
    }
    catch(err){
        console.error("DB 조회 에러:", err);
        res.status(500).json({ error: "데이터를 불러오는 중 오류가 발생했습니다."});
    }
});

app.listen(PORT, ()=>{
    console.log(`🚀 서버가 http://localhost:${PORT} 에서 대기 중입니다.`);
});

