import React, {useState} from 'react'
// 1. 순수 범용 블록은 components에서 가져옴 (Generic)
import List from './components/List/List';


// 2. 재고 업무에 특화된 아이템과 로직은 domain에서 가져옴(Domain Specific)
import {StockHierarchicalItem}  from "./domains/stock/items/StockHierarchicalItem";

import {StockToolBarBox} from "./domains/stock/components/StockToolBarBox";

import {useStockHierarchical} from "./domains/stock/hooks/useStockHierarchical";

function App(){

    const {
        currentItems,
        totalCount,
        loading,
        currentPage,
        setCurrentPage,
    }=useStockHierarchical(20);

    const [searchParams, setSearchParams] = useState<Record<string, any>>({});

    const handleSearch = (values: Record<string, any>) =>{
        console.log("🔍 툴바에서 전송된 검색 조건들:", values);
        setSearchParams(values);
        setCurrentPage(1);

    };

    const handleReset = (initialValues: Record<string, any>) => {
        console.log("🔄 툴바 초기화 완료:", initialValues);
        setSearchParams(initialValues);
        setCurrentPage(1);
    };

    return(
        <div style={{padding : '30px', background: '#f1f5f9', minHeight: '100vh'}}>
            <h1>ERP 계층형 재고 현황(Clean Architecture)</h1>

            {/*상단에 무색무취 기계로 찍어낸 고급형 툴바 배치 */}
            <StockToolBarBox onSearch={handleSearch} onReset={handleReset}/>

            {/* 범용 리스트에 재고 전용 아이템을 '주입(Injection)' */}
            <List
                className="erp-hierarchical-list"
                items={currentItems}
                loading={loading}
                totalCount={totalCount}
                currentPage={currentPage}
                itemsPerPage={20}
                onPageChange={setCurrentPage}
                renderItem={(item) => <StockHierarchicalItem parent={item} />
            }/>
        </div>
    );
}

export default App;