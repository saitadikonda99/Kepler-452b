import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="pagination">
      <button
        className="previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        Prev
      </button>
      
      {getPageNumbers().map((pageNum, index) => (
        pageNum === '...' ? (
          <span key={`dots-${index}`} className="dots">...</span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(pageNum)}
            className={`page-num ${currentPage === pageNum ? "page-active" : ""}`}
            aria-label={`Page ${pageNum}`}
            disabled={currentPage === pageNum}
          >
            {pageNum}
          </button>
        )
      ))}

      <button
        className="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination; 