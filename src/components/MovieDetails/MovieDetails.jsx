import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  fetchMovieById,
  addReview,
  selectCurrentMovie,
  selectMoviesStatus,
} from "../../Store/movieSlice";
import HeaderSection from "./../HeaderSection/HeaderSection";
import ReviewsSection from "./../ReviewsSection/ReviewsSection";
import ReviewModal from "./../ReviewModal/ReviewModal";
import ActionSection from "../ActionSection/ActionSection";
import MainContent from "./../MainContent/MainContent";
import TrailerModal from "./../TrailerModal/TrailerModal";

export default function MovieDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const movie = useSelector(selectCurrentMovie);
  const status = useSelector(selectMoviesStatus);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [dispatch, id]);

  const handleAddReview = (newReview) => {
    if (movie?.imdbID) {
      dispatch(addReview({ id: movie.imdbID, review: newReview }));
    }
    setShowReview(false);
  };

  // Loading state (maintains your design while loading)
  if (status === "loading") {
    return (
      <motion.div
        className="min-vh-100 d-flex align-items-start py-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%)",
          color: "#f8f9fa",
          fontFamily: "'Segoe UI', Roboto, sans-serif",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </Container>
      </motion.div>
    );
  }

  // Error state (styled to match your design)
  if (!movie) {
    return (
      <motion.div
        className="min-vh-100 d-flex align-items-start py-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%)",
          color: "#f8f9fa",
          fontFamily: "'Segoe UI', Roboto, sans-serif",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <div className="text-center">
            <h3>Movie not found</h3>
            <p>Please try another one</p>
          </div>
        </Container>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-vh-100 d-flex align-items-start py-5"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%), url(${movie.Poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "#f8f9fa",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Container className="px-4 px-md-5">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <HeaderSection
            title={movie.Title}
            year={movie.Year}
            rating={movie.Rated}
            genre={movie.Genre?.join(", ")}
          />
        </motion.div>

        <Row className="mt-5 g-4">
          <Col md={4}>
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <ActionSection
                userScore={movie.imdbRating}
                moviePoster={movie.Poster}
                onWatchTrailer={() => setShowTrailer(true)}
                onAddToWatchlist={() => {}}
              />
            </motion.div>
          </Col>
          <Col md={8}>
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <MainContent
                description={movie.Plot}
                creators={movie.Director}
                actors={movie.Actors}
                language={movie.Language}
              />
            </motion.div>
          </Col>
        </Row>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <ReviewsSection
            reviews={movie.Ratings || []}
            onAddReview={() => setShowReview(true)}
          />
        </motion.div>
      </Container>

      <TrailerModal
        show={showTrailer}
        onHide={() => setShowTrailer(false)}
        movieTitle={movie.Title}
        movieTrailer={movie.Trailer}
      />

      <ReviewModal
        show={showReview}
        onHide={() => setShowReview(false)}
        movie={movie}
      />
    </motion.div>
  );
}
