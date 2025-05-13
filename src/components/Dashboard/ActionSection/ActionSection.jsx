import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import moviePoster from "../../assets/download.jpeg";
export default function ActionSection({ onWatchTrailer, onAddToWatchlist }) {
  const userScore = 88;

  const starRating = Math.round((userScore / 100) * 5);

  return (
    <Card
      className="p-3 rounded text-center mb-4 overflow-hidden position-relative"
      style={{
        border: "2px solid rgba(255, 255, 255, 0.1)",
        background: "transparent",
        minHeight: "400px",
      }}>
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${moviePoster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(0.4)",
          zIndex: 0,
          opacity: 0.8,
        }}
      />

      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
        <div className="d-flex justify-content-center mb-4">
          <Image
            src={moviePoster}
            alt="Movie Poster"
            className="rounded"
            style={{
              width: "150px",
              height: "225px",
              objectFit: "cover",
              border: "3px solid #ff0000",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>

        <h3
          className="text-white"
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}>
          {userScore}°
        </h3>

        <div className="my-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarFill
              key={star}
              color={
                star <= starRating ? "#ffcc00" : "rgba(255, 255, 255, 0.3)"
              }
              className="mx-1"
              style={{ fontSize: "1.5rem" }}
            />
          ))}
        </div>

        <div className="mt-auto">
          <Button
            variant="danger"
            className="w-100 py-2 mb-3"
            onClick={onWatchTrailer}
            style={{
              fontWeight: "bold",
              letterSpacing: "1px",
              boxShadow: "0 2px 8px rgba(255, 0, 0, 0.5)",
              backgroundColor: "#e3080f",
            }}>
            WATCH TRAILER
          </Button>

          <Button
            variant="outline-light"
            className="w-100 py-2"
            onClick={onAddToWatchlist}
            style={{
              fontWeight: "bold",
              letterSpacing: "1px",
              borderWidth: "2px",
            }}>
            ADD TO WATCHLIST
          </Button>
        </div>
      </div>
    </Card>
  );
}
