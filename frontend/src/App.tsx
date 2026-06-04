import React, { useEffect, useState } from 'react';
import List from './components/List/List';

//데이터 타입 정의 (기존 matchingFunc 대신 타입을 명확히 함)
interface ItemData{
    id: number;
    message:string;
}

function App() {

    const [data, setData] = useState<ItemData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect( ()=>{
        //벡엔드에서 데이터 가져오기
        fetch('http://localhost:3000/api/test') //벡엔드 주소 확인
            .then(res => res.json())
            .then(result =>{
                setData(result);
                setLoading(false);
            })
            .catch(err =>{
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{padding: '20px'}}>
            <h1> 범용 리스트 테스트</h1>

            <List items={data}
                  loading={loading}
                  renderItem={(item) =>(
                      <div style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
                          <strong>ID:</strong> {item.id} | <strong>내용:</strong> {item.message}
                      </div>
                  )}
            />
        </div>
    );
    // 초기값을 '연결 중...'으로 설정합니다.
}

export default App;