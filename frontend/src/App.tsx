import React, { useEffect, useState } from 'react';
import List from './components/List/List';

interface RingBufferData{
    ID: number,
    GOODS_NO: number,
    IN_DATE: string,
    EXPIRATION_DATE: string,
    THRESHOLD:string,
    REMAINING_DAYS: number
}

function App(){
    const [data, setData] = useState<RingBufferData[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage =10;

    useEffect(() =>{
        fetch('http://localhost:4000/api/ring-buffer')
            .then(res=>res.json())
            .then(result =>{
                setData(result);
                setLoading(false);
            });
    }, []);

    // 페이징 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


    // 바닐라 JS의 metchingFunc과 같은 역활(자유로운 UI 설계)
    const myMatchingFunc = (item: RingBufferData) =>(
        <div style={{
            border: '1px solid #ddd',
            margin: '5px 0',
            padding: '15px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: item.REMAINING_DAYS <= 7 ? '#fff5f5' : '#fff'
        }}>
            <div>
                <span style={{fontWeight: 'bold', marginRight: '10px'}}>#{item.ID}</span>
                <strong>상품번호: {item.GOODS_NO}</strong>
            </div>
            <div>
                <small>입고: {item.IN_DATE.split('T')[0]}</small>
                <span style={{
                    marginLeft: '20px',
                    color: item.REMAINING_DAYS <7 ? 'red' : 'blue',
                    fontWeight: 'bold'
                }}>
                    {item.REMAINING_DAYS}일 남음
                </span>
            </div>
        </div>
    );

    return (
        <div style={{padding: '20px'}}>
            <h1>ERP 자유형 리스트 시스템</h1>

            <List
                className="my-erp-list"
                items={currentItems}
                totalCount={data.length}
                loading={loading}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                renderItem={myMatchingFunc}
            />

        </div>
    );
}

export default App;