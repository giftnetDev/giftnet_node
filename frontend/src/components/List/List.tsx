import React, {ReactNode} from 'react';
import Pagination from '../Pagination/Pagination';

interface ListProps<T> {
    items: T[];                             // 전체 데이터 (또는 현재 페이지 데이터)
    loading: boolean;
    totalCount: number;                     // 전체 데이터 개수 (페이징용)
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;   // 바닐라 JS의 matchingFunc와 Item.js 역할을 대신하는 함수
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;                     // 바닐라의 Me.className 역할
}

function List<T>({
    items,
    loading,
    totalCount,
    currentPage,
    itemsPerPage,
    onPageChange,
    renderItem,
    className="custom-list"
}: ListProps<T>){
    return (
        <div className={className} style={{display: 'flex', flexDirection: 'column'}}>
            {/*바닐라 JS의 lHead 역활 */}
            <div className="lHead" style={{marginBottom: '10px'}}>
                {/*필요 시 검색창이나 버튼 등을 App.tsx에서 넘겨받아 배치 가능*/}
            </div>

            {/*바닐라 JS의 lBody 역활*/}
            <div className="lBody" style={{flex: 1}}>
                {loading ? (<div className="loading">데이터를 불러오는 중...</div>) : items.length === 0 ?
                    (<div className="empty">검색 결과가 없습니다</div>) : (
                    items.map( (item, index) =>(
                        //바닐라의 .list-item-unit 클래스 유지
                        <div key={index} className="list-item-unit">
                            {renderItem(item, index)}
                        </div>
                        )
                    )

                )}
            </div>

            {/* 바닐라 JS의 lTail 역활 + Pagination 연동 */}
            <div className="lTail" style={{marginTop: '20px'}}>
                {!loading && totalCount > 0 &&(
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={totalCount}
                        currentPage={currentPage}
                        paginate={onPageChange}
                    />

                )}
            </div>
        </div>
    );
}

export default List;