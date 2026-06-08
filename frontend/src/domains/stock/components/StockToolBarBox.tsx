import React from 'react';
import {ToolBar, ToolBarFieldConfig} from "../../../components/ToolBar/ToolBar";

interface StockToolBarBoxProps{
    onSearch: (params: any) => void;
    onReset : (params: any) => void;
}

export const StockToolBarBox: React.FC<StockToolBarBoxProps> =({onSearch, onReset}) =>{
    //범용 툴바 기계에 주입할 "유통기한 재고 학인 전용 필드" 설정 리스트
    const stockFields : ToolBarFieldConfig[] =[
        {name: 'keyword', label: '검색어', type: 'text', placeholder: '상품번호 또는 LOT번호'},
        {
            name: 'status',
            label: '상태',
            type: 'select',
            options:[
                ['','전체'],
                ['active', '활성 배치 있음'],
                ['expired', '말료 배치 있음'],
                ['empty','활성 배치 없음']
            ],
        },
        {
            name: 'pageSize',
            label: '보기',
            type: 'select',
            options: [
                ['20','20개씩'],
                ['50','50개씩'],
                ['100','100개씩']
            ]
        },
        {name : 'baseDate', label: '기준일', type:'date'},
        {
            name:'sort',
            label:'정렬',
            type: 'select',
            options: [['goodsNo', '상품번호'], ['currentExpDate', '현재 만료일'], ['expiredCount', '만료건수']]
        },
        {
            name: 'sortOrder',
            label: '순서',
            type: 'radio',
            options: [['asc','오름차순'],['desc', '내림차순']]
        }
    ];
    
    const stockInitialValues={
        keyword: '',
        status: '',
        pageSize:'20',
        baseDate: '2026-05-20',
        sort: 'goodsNo',
        sortOrder:'asc'
    };
    
    return(
        <ToolBar title="📅 유통기한 재고 관리 검색"
                 fields={stockFields}
                 initialValues={stockInitialValues}
                 onSearch={onSearch}
                 onReset={onReset}/>
    );
};