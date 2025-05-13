import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardHeader from "../BoardHeader";
import "../../styles/DashBoard.css";
import BoardList from "../BoardList";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies, removeMovie } from "../../Store/movieSlice";
import { checkAdminSession, selectIsAdmin } from "../../Store/authSlice";

export default function DashBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navigationFlag, setNavigationFlag] = useState(false);

  const { allMovies: media, status } = useSelector((state) => state.movies);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const isAdmin = useSelector(selectIsAdmin);

  useEffect(() => {
    dispatch(checkAdminSession());
    dispatch(fetchAllMovies());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMedia(media);
  }, [media]);

  if (!isAdmin) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Unauthorized access. Please login as admin.
        </div>
      </div>
    );
  }

  const handleSearch = (searchTerm) => {
    const filtered = media.filter(
      (item) =>
        item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Genre?.some((g) =>
          g.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredMedia(filtered);
  };

  const handleNavigation = (path) => {
    if (!navigationFlag) {
      setNavigationFlag(true);
      navigate(path);
    }
  };

  const handleAdd = () => handleNavigation("/movies/0/edit");
  const handleEdit = (id) => handleNavigation(`/movies/${id}/edit`);
  const handleView = (id) => handleNavigation(`/moviedetails/${id}`);

  const handleDelete = async (imdbID) => {
    try {
      await dispatch(removeMovie(imdbID)).unwrap();
      dispatch(fetchAllMovies());
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (status === "loading") {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <BoardHeader onSearch={handleSearch} onAdd={handleAdd} />
      <div className="board-list">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Genre</th>
              <th>IMDB Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedia.map((item) => (
              <tr key={item.id}>
                <td>{item.Title}</td>
                <td>{item.Type}</td>
                <td>{item.Genre?.join(", ") || "-"}</td>
                <td>{item.imdbRating}</td>
                <td className="actions-cell">
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => handleView(item.id)}
                  >
                    <FaEye />
                  </Button>{" "}
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleEdit(item.id)}
                  >
                    <FaEdit />
                  </Button>{" "}
                  <Button
                    variant="btn"
                    className="btn-outline-red"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
