import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
export default function ActionSection({
  onWatchTrailer,
  onAddToWatchlist,
  moviePoster,
  userScore,
}) {


  return (
    <Card
      className="position-relative text-white overflow-hidden rounded-5 p-4 p-md-5 mb-5 shadow-lg"
      style={{
        background: "rgba(18, 18, 18, 0.65)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        minHeight: "480px",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.015)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
      }}
    >
      {/* Blurred Background */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${moviePoster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(18px) brightness(0.25)",
          zIndex: 0,
          opacity: 0.7,
        }}
      />

      {/* Overlay Gradient */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(10, 10, 10, 0.8), rgba(20, 20, 20, 0.9))",
          zIndex: 1,
        }}
      />

      {/* Foreground Content */}
      <div
        className="position-relative h-100 d-flex flex-column align-items-center text-center"
        style={{ zIndex: 2 }}
      >
        {/* Poster Image */}
        <Image
          src={moviePoster}
          alt="Movie Poster"
          className="rounded-4 mb-4"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.7)",
            transform: "translateY(-20px)",
          }}
        />
        <Card.Text>
          <h3 className="text-warning">
            {userScore}
            <i className="fa-solid fa-star"></i>
          </h3>
        </Card.Text>
        {/* Buttons */}
        <div className="mt-auto w-100">
          <Button
            variant="danger"
            className="w-100 fw-semibold py-2 mb-3 rounded-3"
            onClick={onWatchTrailer}
            style={{
              backgroundColor: "#e50914",
              border: "none",
              fontSize: "1rem",
              letterSpacing: "1px",
              boxShadow: "0 3px 10px rgba(229, 9, 20, 0.5)",
            }}
          >
            ▶ WATCH TRAILER
          </Button>

          <Button
            variant="outline-light"
            className="w-100 fw-semibold py-2 rounded-3"
            onClick={onAddToWatchlist}
            style={{
              fontSize: "1rem",
              letterSpacing: "1px",
              borderWidth: "2px",
              borderColor: "rgba(255, 255, 255, 0.3)",
            }}
          >
            ＋ ADD TO WATCHLIST
          </Button>
        </div>
      </div>
    </Card>
  );
}
