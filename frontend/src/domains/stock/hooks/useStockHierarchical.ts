import {useState, useEffect} from 'react';
import {StockExpRingBuffer} from '@shared/types/stock';
import { stockService } from '../services/stockService';

export const useStockHierarchical = (itemsPerPage: number =5) => {
    const [data, setData] = useState<StockExpRingBuffer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        stockService.fetchHierarchicalStock()
            .then(result => {
                setData(result.items || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("데이터 로드 실패:", err);
                setLoading(false);
            });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalCount = data.length;

    return {
        currentItems,
        totalCount,
        loading,
        currentPage,
        setCurrentPage, //view에서 호출한 상태 변경 핸들러
    };
};
