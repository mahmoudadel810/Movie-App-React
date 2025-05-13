import React, { useState, useEffect } from "react";
import Slider from "../../components/Slider";
import MoviesSection from "../../components/MoviesSection";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("../server/data.json");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setMovies(data.movies || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );
  }

  const popularMovies = movies
    .filter(
      (m) =>
        m.Popular &&
        (m.Popular === "True" || m.Popular === "true" || m.Popular === true)
    )
    .slice(0, 10);

  const newReleases = movies
    .filter((m) => new Date(m.Released).getFullYear() >= 2023)
    .sort((a, b) => new Date(b.Released) - new Date(a.Released));

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Slider />

      <MoviesSection title="Popular Movies" movies={popularMovies} />

      <MoviesSection title="Newest Movies" movies={newReleases} />
    </div>
  );
}
