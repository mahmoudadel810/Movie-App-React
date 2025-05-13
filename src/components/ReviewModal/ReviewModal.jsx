import React, { useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { addReview } from "../../Store/movieSlice";
import { useDispatch } from "react-redux";

function ReviewModal({ show, onHide, movie }) {
  // Added movie prop
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const dispatch = useDispatch();

  // Removed duplicate showReviewModal state (it should be controlled by parent)

  const handleSubmit = () => {
    if (!reviewText || !reviewerName) return;

    const review = {
      Source: reviewerName,
      Value: reviewText,
    };

    dispatch(addReview({ id: movie.id, review }));
    setReviewText("");
    setReviewerName("");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#000000",
          color: "white",
          borderColor: "#000000",
        }}
      >
        <Modal.Title>Add Your Review</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#000000",
          color: "white",
          borderColor: "#000",
        }}
      >
        <Form>
          <Form.Group className="mb-3" id="reviewerName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="reviewerName"
              name="reviewerName"
              type="text"
              placeholder="Enter Your Name"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
            />
          </Form.Group>
          <FloatingLabel
            controlId="reviewText"
            label="Your Review"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#000000",
          color: "white",
          borderColor: "#000",
        }}
      >
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleSubmit}
          disabled={!reviewText || !reviewerName}
        >
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewModal;
