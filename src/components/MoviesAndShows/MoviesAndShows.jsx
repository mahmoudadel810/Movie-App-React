import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, InputGroup } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "../MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies, fetchAllGenres } from "../../Store/movieSlice";
import { useLocation } from "react-router-dom";

export function MoviesAndShows() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Get data from Redux store
  const {
    allMovies: movies,
    genres: genre,
    status,
  } = useSelector((state) => state.movies);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(fetchAllGenres());
  }, [dispatch]);

  const getInputValues = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.Title.toLowerCase().includes(searchTerm);
    const matchesGenre =
      selectedGenre === "All" ||
      movie.Genre?.some((g) => g.toLowerCase() === selectedGenre.toLowerCase());
    return matchesSearch && matchesGenre;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.3 },
    },
  };

  if (status === "loading") {
    return (
      <motion.div
        className="d-flex justify-content-center align-items-center min-vh-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <Container
      className="mt-3"
      style={{ color: "#fff" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className="text-center mb-5 fw-bold" variants={titleVariants}>
        Movies
      </motion.h1>

      <motion.div variants={formVariants}>
        <Form className="d-flex mb-4 justify-content-center align-items-center">
          <InputGroup className="w-50">
            <motion.div whileHover={{ scale: 1.01 }} style={{ width: "100%" }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                onChange={getInputValues}
                className="fw-bold"
                style={{
                  backgroundColor: "#111",
                  color: "#fff",
                  borderColor: "#333",
                }}
              />
            </motion.div>
          </InputGroup>
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{ marginLeft: "1rem" }}
          >
            <Form.Select
              style={{
                width: "200px",
                fontWeight: "bold",
                backgroundColor: "#111",
                color: "#fff",
              }}
              onChange={(e) => setSelectedGenre(e.target.value)}
              value={selectedGenre}
            >
              <option value="All">All Genres</option>
              {genre.map((genreItem, index) => (
                <option key={index} value={genreItem}>
                  {genreItem}
                </option>
              ))}
            </Form.Select>
          </motion.div>
        </Form>
      </motion.div>

      <AnimatePresence>
        <Row className="g-4">
          {filteredMovies.length === 0 ? (
            <motion.div
              className="w-100 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-muted">No movies found</h3>
            </motion.div>
          ) : (
            filteredMovies.map((movie) => (
              <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  layout
                >
                  <MovieCard
                    style={{
                      backgroundColor: "#000",
                      boxSizing: "border-box",
                    }}
                    movie={movie}
                  />
                </motion.div>
              </Col>
            ))
          )}
        </Row>
      </AnimatePresence>
    </Container>
  );
}
