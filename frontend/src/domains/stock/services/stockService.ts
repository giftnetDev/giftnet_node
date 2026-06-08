/**
 * 서버에서 데이터를 fetch해오는 순수한 데이터 소스 레이어입니다.
 */

import {StockExpRingBuffer} from '@shared/types/stock';

const API_BASE_URL = 'http://localhost:4000/api';

export const stockService ={
    async  fetchHierarchicalStock(): Promise<{items: StockExpRingBuffer[]}>{
        const response = await fetch(`${API_BASE_URL}/hierarchical-stock`);
        if(!response.ok){
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }
        return response.json();
    }
}