import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { PersonFill, Plus } from "react-bootstrap-icons";
import styles from "./ReviewsSection.module.css";

function ReviewsSection({ reviews, onAddReview }) {
  return (
    <div className="mt-5">
      {/* Section Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4
          className="text-light fw-bold"
          style={{ fontSize: "2.25rem", letterSpacing: "1px" }}
        >
          USER REVIEWS
        </h4>
        <Button
          variant="danger"
          className="rounded-pill px-4 py-2 fw-bold"
          onClick={onAddReview}
          style={{
            backgroundColor: "#e3080f",
            borderColor: "#e3080f",
            fontSize: "1.1rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c81a10")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#e3080f")}
        >
          <Plus className="me-2" style={{ fontSize: "1.25rem" }} />
          Add Review
        </Button>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <Row className="g-4">
          {reviews.map((review, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="bg-dark text-light shadow-lg rounded-3 p-3">
                <div className="d-flex align-items-center mb-3">
                  {/* Reviewer Image or Default Icon */}
                  <div
                    className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: "1rem",
                    }}
                  >
                    <i className="fs-1 bi bi-person"></i>
                  </div>
                  <div>
                    {/* Reviewer Name */}
                    <span className="fw-bold" style={{ fontSize: "1.1rem" }}>
                      {review.Source || "Anonymous"}
                    </span>
                  </div>
                </div>

                {/* Review Comment/Content */}
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    color: "#f8f9fa",
                  }}
                >
                  {review.Value}
                </p>

                {/* Optional: Review Date (If available) */}
                {review.date && (
                  <div
                    className="mt-2 text-muted"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <i className="bi bi-calendar"></i> {review.date}
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="bg-dark text-light shadow-lg rounded-3 text-center p-4">
          <p style={{ fontSize: "1.2rem", fontStyle: "italic" }}>
            No reviews yet. Be the first to review!
          </p>
        </Card>
      )}
    </div>
  );
}

export default ReviewsSection;
