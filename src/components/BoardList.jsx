import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function BoardList({ media, onEdit, onDelete, onShow }) {
  return (
    <div className="board-list">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Genre</th>
            <th> IMDB Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {media.map((item) => (
            <tr key={item.id}>
              <td>{item.Title}</td>
              <td>{item.Type}</td>
              <td>{item.Genre?.join(", ") || "-"}</td>
              <td>{item.imdbRating}</td>
              <td className="actions-cell">
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => onShow(item)}>
                  <FaEye />
                </Button>{" "}
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => onEdit(item)}>
                  <FaEdit />
                </Button>{" "}
                <Button
                  variant="btn"
                  className="btn-outline-red"
                  size="sm"
                  onClick={() => onDelete(item)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
