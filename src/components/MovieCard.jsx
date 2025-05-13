import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  function showDetails() {
    navigate(`/moviedetails/${movie.id}`);
  }
  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.Poster} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>
          <small className="text-muted">
            {movie.Year} | {movie.Runtime}
          </small>
          <br />
          <span className="text-warning">
            {movie.imdbRating} <i className="fa-solid fa-star"></i>
          </span>
        </Card.Text>
        <Button
          variant="danger"
          onClick={showDetails}
          style={{
            background: "var(--main-color)",
            gap: "10px",
            padding: "10px 30px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "20px",
            margin: "0 auto",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}
