import pool from "../config/db.js"; // 기존에 만드신 DB pool 불러오기
import { StockExpRingBuffer, StockExpirationDate } from "@shared/types/stock.js";

export const stockRepository = {
    // 1. 부모 테이블 전체 조회 (페이징/검색 로직은 우선 생략)
    async findAllParents(): Promise<StockExpRingBuffer[]> {
        const [rows] = await pool.query('SELECT ID, GOODS_NO, EXPIRATION_DATE FROM T_ST_EXP_RING_BUFFER');
        return rows as StockExpRingBuffer[];
    },

    // 2. 부모 ID들에 해당하는 자식 테이블 데이터들 조회 (IN 쿼리 활용)
    async findChildrenByParentIds(goodsNos: number[]): Promise<StockExpirationDate[]> {
        if (goodsNos.length === 0) return [];

        // 예: SELECT * FROM T_STOCK_EXPIRATION_DATE WHERE RING_BUFFER_ID IN (1, 2, 3)
        const [rows] = await pool.query(
            `SELECT * FROM T_STOCK_EXPIRATION_DATE WHERE GOODS_NO IN (?)`,
            [goodsNos]
        );
        return rows as StockExpirationDate[];
    }
};