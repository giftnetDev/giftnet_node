import {Request, Response} from 'express';
import {stockService} from '../services/stockService.js';

export const stockController ={
    async getHierarchicalStock(req: Request, res: Response){
        try{
            const data = await stockService.getHierarchicalStockList();
            res.json({
                items: data,
                totalCount: data.length
            });
        }
        catch(error){
            console.error(error);
            res.status(500).json({message: "서버 오류가 발생했습니다."});
        }
    }
}