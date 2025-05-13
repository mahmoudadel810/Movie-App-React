import React from "react";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";
import "../styles/MoviesSection.css";

export default function MoviesSection({
  title,
  movies,
  showGenres = false,
  showReleaseDates = false,
}) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="container movies-section mt-5">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 className="section-title text-white">{title}</motion.h2>
      </motion.div>

      {showGenres && (
        <motion.div
          className="genres-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h4 className="section-subtitle">Our Genres</h4>
          <div className="genres-list">
            {["Action", "Adventure", "Comedy", "Drama", "Horror"].map(
              (genre) => (
                <motion.span
                  key={genre}
                  className="genre-link"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {genre} →
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      )}

      {showReleaseDates && (
        <motion.div
          className="release-dates"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {movies.slice(0, 4).map((movie, index) => (
            <div key={index} className="release-date">
              Released at {movie.Released}
            </div>
          ))}
        </motion.div>
      )}

      <Row className="movies-row">
        {movies.slice(0, 4).map((movie, index) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
