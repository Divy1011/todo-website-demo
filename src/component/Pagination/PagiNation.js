import React from "react";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const showArrows = totalPages > 3;

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
          <button onClick={() => paginate(1)} className="page-link" disabled={isFirstPage}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </li>
        <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
          <button onClick={() => paginate(currentPage - 1)} className="page-link" disabled={isFirstPage}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => {
          if (showArrows && ((index < currentPage - 3 && index > 0) || (index > currentPage + 1 && index < totalPages - 1))) {
            // Show ellipsis after 5 pages
            return <li key={index} className={`page-item disabled`}><span className="page-link">...</span></li>;
          } else if (!showArrows || (index >= currentPage - 3 && index <= currentPage + 1)) {
            // Render page numbers within a range of 3 pages before and after the current page
            return (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            );
          }
          return null;
        })}
        <li className={`page-item ${isLastPage ? "disabled" : ""}`}>
          <button onClick={() => paginate(currentPage + 1)} className="page-link" disabled={isLastPage}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </li>
        <li className={`page-item ${isLastPage ? "disabled" : ""}`}>
          <button onClick={() => paginate(totalPages)} className="page-link" disabled={isLastPage}>
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
