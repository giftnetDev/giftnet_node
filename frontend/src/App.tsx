import React from 'react'
// 1. 순수 범용 블록은 components에서 가져옴 (Generic)
import List from './components/List/List';

// 2. 재고 업무에 특화된 아이템과 로직은 domain에서 가져옴(Domain Specific)
import {StockHierarchicalItem}  from "./domains/stock/items/StockHierarchicalItem";
import {useStockHierarchical} from "./domains/stock/hooks/useStockHierarchical";

function App(){
    const itemsPerPage = 5;
    const {currentItems, totalCount, loading, currentPage, setCurrentPage} = useStockHierarchical(itemsPerPage);

    return(
        <div style={{padding : '30px', background: '#f1f5f9', minHeight: '100vh'}}>
            <h1>ERP 계층형 재고 현황(Clean Architecture)</h1>

            {/* 범용 리스트에 재고 전용 아이템을 '주입(Injection)' */}
            <List items={currentItems}
                  loading={loading}
                  totalCount={totalCount}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  renderItem={(item) => <StockHierarchicalItem parent={item} />
            }/>
        </div>
    );
}

export default App;