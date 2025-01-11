import React from "react";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
  loading,
}) => {
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  if (loading) {
    return (
      <div className="pagination">
        <div className="pagination-controls">
          <button className="page-button skeleton-button" disabled>
            Previous
          </button>
          <div className="page-numbers">
            <button className="page-number skeleton-button" disabled>
              1
            </button>
          </div>
          <button className="page-button skeleton-button" disabled>
            Next
          </button>
        </div>
        <div className="page-info skeleton-text"></div>
      </div>
    );
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const addPageNumber = (pageNum) => {
      pageNumbers.push(
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={`page-number ${currentPage === pageNum ? "active" : ""}`}
          disabled={currentPage === pageNum}
        >
          {pageNum}
        </button>
      );
    };

    const addEllipsis = (key) => {
      pageNumbers.push(
        <span key={`ellipsis-${key}`} className="ellipsis">
          ...
        </span>
      );
    };

    addPageNumber(1);

    if (currentPage > 3) {
      addEllipsis("start");
    }

    for (
      let i = Math.max(2, currentPage - 2);
      i <= Math.min(totalPages - 1, currentPage + 2);
      i++
    ) {
      if (i > 1 && i < totalPages) {
        addPageNumber(i);
      }
    }

    if (currentPage < totalPages - 3) {
      addEllipsis("end");
    }

    if (totalPages > 1) {
      addPageNumber(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-button"
        >
          Previous
        </button>

        <div className="page-numbers">{renderPageNumbers()}</div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-button"
        >
          Next
        </button>
      </div>

      <div className="page-info">{totalRecords} total records</div>
    </div>
  );
};

export default Pagination;
