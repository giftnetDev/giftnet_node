import React from 'react';
import {StockExpRingBuffer} from '@shared/types/stock';

interface StockHierarchicalItemProps{
    parent: StockExpRingBuffer;
}

export const StockHierarchicalItem: React.FC<StockHierarchicalItemProps> = ({parent}) =>{
    return (
        <div style={{
            border: '1px solid #cbd5e1',
            borderRadius: '12px',
            margin: '15px 0',
            padding: '20px',
            background: '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}>
            {/* 부모(Master) 디자인 */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '2px solid #f1f5f9', paddingBottom: '12px', marginBottom: '12px'
            }}>
                <div>
          <span style={{ background: '#2c3e50', color: '#fff', padding: '3px 8px', borderRadius: '4px', marginRight: '10px', fontSize: '0.85em' }}>
            Master #{parent.ID}
          </span>
                    <strong style={{ fontSize: '1.1em', color: '#1e293b' }}>상품번호: {parent.GOODS_NO}</strong>
                </div>
                <span style={{ fontWeight: 'bold', color: '#0f172a' }}>
          총 재고: <span style={{ color: '#2563eb' }}>{parent.EXPIRATION_DATE}</span>개
        </span>
            </div>

            {/* 자식(Detail) 디자인 */}
            <div style={{ paddingLeft: '15px' }}>
                {parent.expirationDates && parent.expirationDates.length > 0 ? (
                    parent.expirationDates.map((child) => (
                        <div key={child.SUB_ID} style={{
                            background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px',
                            margin: '8px 0', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9em'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ color: '#94a3b8', fontWeight: 'bold' }}>└ Detail</span>
                                <span style={{ color: '#475569' }}>LOT 번호: <strong>{child.LOT_NO || '없음'}</strong></span>
                            </div>
                            <span style={{ color: '#dc2626', fontWeight: 'bold' }}>재고 수량: {child.IN_QTY}개</span>
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#94a3b8', fontSize: '0.9em', margin: '5px 0' }}>
                        └ 연동된 상세 일자 데이터가 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
};