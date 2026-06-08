export interface StockExpirationDate{
    SUB_ID : number;
    GOODS_NO : number;  //부모와 연결되는 기준키(상품번호)
    IN_QTY : number;
    LOT_NO : string;
}

export interface StockExpRingBuffer{
    ID : number;
    GOODS_NO : number;  //Unique Key
    EXPIRATION_DATE: string;
    expirationDates?: StockExpirationDate[];
}