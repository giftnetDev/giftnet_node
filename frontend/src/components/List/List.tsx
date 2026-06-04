import React from 'react';

interface ListProps<T>{
    items: T[]; //출력할 데이터 배열
    renderItem: (item: T, index: number) => React.ReactNode;    //각 항목을 어떻게 그릴지 정의하는 함수
    loading? : boolean;
    emptyMessage?: string;
}

function List<T>({
    items,
    renderItem,
    loading=false,
    emptyMessage ="데이터가 없습니다."

                 }: ListProps<T>){

    //데이터가 로딩중일 때
    if(loading){
        return <div className="list-loading">데이터를 불러오는 중입니다...</div>;
    }

    //데이터가 없을 때
    if(items.length === 0){
        return <div className = "list-empth">{emptyMessage}</div>;
    }

    return (
        <div className="list-container">
            <ul style={{listStyle: 'none', padding: 0}}>
                {items.map((item, index) =>(
                    <li key={index} className="list-item-unit">
                        {renderItem(item, index)}
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default List;