import mysql from 'mysql2/promise';

const dbConfig ={
    host: 'localhost',
    user: 'root',
    password:'giftnet1q2w3e4r!',
    database: 'giftnet',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

pool.getConnection()
    .then((connection) => {
        console.log('✅ MariaDB Connection Pool이 성공적으로 연결되었습니다.');
        connection.release(); // 테스트 후 연결 반환
    })
    .catch((err) => {
        console.error('❌ DB 연결 실패! 설정을 확인하세요:', err.message);
    });

export default pool;