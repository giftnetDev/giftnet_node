import React from 'react';

interface PaginationProps{
    itemsPerPage: number;
    totalItems : number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    itemsPerPage,
    totalItems,
    currentPage,
    paginate
}) => {
    const totalPages = Math.ceil(totalItems/ itemsPerPage);
    const pageNumbers=[];

    for(let i =1; i <= totalPages; i++){
        pageNumbers.push(i);
    }

    return (
        <nav style={{marginTop: '20px', display: 'flex', justifyContent : 'center', gap:'5px'}}>
            <button
                onClick={()=>paginate(currentPage-1)}
                disabled={currentPage ===1}
                className="page-btn"
            >이전</button>

            {pageNumbers.map(number =>(
                <button
                    key={number}
                onClick={()=>paginate(number)}
                style={{
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor:'pointer',
                    backgroundColor: currentPage === number ? '#2c3e50' : '#fff',
                    color: currentPage === number ? '#fff' : '#000',
                }}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='page-btn'
                >
                다음
            </button>
        </nav>
    );
};

export default Pagination;