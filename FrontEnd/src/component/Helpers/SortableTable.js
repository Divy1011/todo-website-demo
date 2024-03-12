import React from "react";
import { Button } from "react-bootstrap";
import "./Table.css"; // Import custom CSS file for additional styling

const TableComponent = ({
  columns,
  data,
  handleDelete,
  handleSort,
  sortBy,
  sortOrder,
  handleEdit,
}) => {
  return (
    <table className="table table-striped table-bordered table-hover custom-table">
      <thead>
        <tr>
          <th>No.</th>
          {columns.map((column) => (
            <th
              key={column.field}
              onClick={() => handleSort(column.field)}
              className={sortBy === column.field ? "sorted" : ""}
            >
              {column.title}
              {sortBy === column.field && (
                <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            {columns.map((column) => (
              <td key={column.field}>{item[column.field]}</td>
            ))}
            <td>
              <Button
                onClick={() => handleEdit(item._id)}
                className="btn btn-warning me-2"
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(item._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
