import React from "react";
import { Modal, Button } from "react-bootstrap";

function TrailerModal({ show, onHide, movieTitle, movieTrailer }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="text-light border-0"
      style={{
        background: "rgba(0, 0, 0, 0.85)", // Dark background for better contrast
        borderRadius: "1rem", // Rounded corners for a sleek look
      }}
    >
      <Modal.Header
        style={{
          background: "rgba(0, 0, 0, 0.85)",
          borderBottom: "4px solid ",
        }}
      >
        <Modal.Title
          style={{
            fontSize: "1.75rem",
            fontWeight: "600",
            textTransform: "uppercase",

            color: "white",
          }}
        >
          {movieTitle} - Trailer
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0" style={{ backgroundColor: "#111" }}>
        <div className="ratio ratio-16x9">
          <div className="d-flex justify-content-center align-items-center">
            <iframe
              width="100%"
              height="100%"
              src={movieTrailer}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                borderRadius: "0.5rem",
                boxShadow: "0px 0px 20px rgba(0,0,0,0.6)", // Soft shadow for depth
              }}
            ></iframe>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer
        style={{
          backgroundColor: "#222", // Dark footer for consistency
          borderTop: "2px solid #444",
          justifyContent: "center",
        }}
      >
        <Button
          variant="danger"
          onClick={onHide}
          style={{
            padding: "0.75rem 2rem",
            fontWeight: "bold",
            letterSpacing: "1px",
            borderRadius: "0.5rem",
            backgroundColor: "#e3080f",
            borderColor: "#e3080f",
            boxShadow: "0 4px 15px rgba(255, 48, 48, 0.3)",
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TrailerModal;
