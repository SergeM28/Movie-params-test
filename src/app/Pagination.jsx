import React from 'react';

const Pagination = ({ totalPages, currentPage }) => {
    return (
        <nav className="flex gap-0.5 items-start my-auto text-sm leading-snug whitespace-nowrap text-black text-opacity-50" aria-label="Pagination">
            {[...Array(totalPages)].map((_, index) => {
                const isCurrentPage = index + 1 === currentPage;
                return (
                    <button
                        key={index}
                        className={`flex overflow-hidden flex-col items-center w-10 h-10 ${isCurrentPage ? 'bg-neutral-100' : 'bg-opacity-0'} rounded-[32px]`}
                        aria-current={isCurrentPage ? 'page' : undefined}
                    >
                        <span
                            className={`self-stretch px-3 py-2.5 ${isCurrentPage ? 'border border-solid border-black border-opacity-30' : ''} min-h-[40px] rounded-[44px] ${!isCurrentPage ? 'text-black opacity-50' : 'text-black'}`}
                        >
                            {index + 1 === 3 ? '...' : index + 1}
                        </span>
                    </button>
                );
            })}
            <img src="/pagination.svg" alt="Next page" className="object-contain shrink-0 w-10 rounded-lg aspect-square" />
        </nav>
    );
}

export default Pagination;