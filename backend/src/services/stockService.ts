import {stockRepository} from '../repositories/stockRepository.js';
import {StockExpRingBuffer} from "@shared/types/stock.js";

export const stockService ={
    async getHierarchicalStockList(): Promise<StockExpRingBuffer[]>{

        const parents = await stockRepository.findAllParents();
        const goodsNos = parents.map(p => p.GOODS_NO);

        const allChildren = await stockRepository.findChildrenByParentIds(goodsNos);

        const combinedData = parents.map(parent =>{
            return {
                ...parent,
                expirationDates: allChildren.filter(child => child.GOODS_NO === parent.GOODS_NO)
            };
        });

        return combinedData;
    }
};