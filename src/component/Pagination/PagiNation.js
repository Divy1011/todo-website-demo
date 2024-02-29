import React from "react";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Calculate the start and end pages to display
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  // Adjust start and end pages if there are fewer than 3 pages
  if (endPage - startPage < 2) {
    if (currentPage === totalPages) {
      startPage = Math.max(1, totalPages - 2);
    } else {
      endPage = Math.min(totalPages, startPage + 2);
    }
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(1)}
            className="page-link"
            disabled={isFirstPage}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </li>
        <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="page-link"
            disabled={isFirstPage}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </li>
        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
          <li
            key={startPage + index}
            className={`page-item ${
              currentPage === startPage + index ? "active" : ""
            }`}>
            <button
              onClick={() => paginate(startPage + index)}
              className="page-link">
              {startPage + index}
            </button>
          </li>
        ))}
        <li className={`page-item ${isLastPage ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="page-link"
            disabled={isLastPage}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </li>
        <li className={`page-item ${isLastPage ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(totalPages)}
            className="page-link"
            disabled={isLastPage}>
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
