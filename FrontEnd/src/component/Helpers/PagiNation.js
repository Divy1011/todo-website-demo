import React from "react";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Calculate the start and end pages to display
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  // Ensure that we display exactly 5 pages if possible
  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 3) {
      endPage = 3;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
    }
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(1)}
            className="page-link"
            disabled={isFirstPage}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </li>
        <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="page-link"
            disabled={isFirstPage}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </li>
        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
          <li
            key={startPage + index}
            className={`page-item ${
              currentPage === startPage + index ? "active" : ""
            }`}
          >
            <button
              onClick={() => paginate(startPage + index)}
              className="page-link"
            >
              {startPage + index}
            </button>
          </li>
        ))}
        <li className={`page-item ${isLastPage ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="page-link"
            disabled={isLastPage}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </li>
        <li className={`page-item ${isLastPage ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(totalPages)}
            className="page-link"
            disabled={isLastPage}
          >
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
