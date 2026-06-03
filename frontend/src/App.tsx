import React, { useEffect, useState } from 'react';

function App() {
    // 초기값을 '연결 중...'으로 설정합니다.
    const [message, setMessage] = useState<string>('연결 중...');

    useEffect(() => {
        // 백엔드 서버(4000번 포트)의 API를 호출합니다.
        fetch('http://localhost:4000/api/test')
            .then((res) => {
                if (!res.ok) throw new Error('네트워크 응답 에러');
                return res.json();
            })
            .then((data) => {
                // 서버에서 [ { "message": "성공" } ] 형태로 오므로 data[0]을 잡습니다.
                if (data && data.length > 0) {
                    setMessage(data[0].message);
                }
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setMessage('서버 연결 실패 (백엔드를 켰는지 확인하세요!)');
            });
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Giftnet Node 로컬 테스트</h1>
            <hr />
            <p>
                서버 상태: <strong>{message}</strong>
            </p>
        </div>
    );
}

export default App;