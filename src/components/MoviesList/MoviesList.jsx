import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const KEY = "edbb72f5";

export function MoviesList({ query }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
      );
      if (!response.ok)
        throw new Error("Something went wrong faild to fetch movies");
      const data = await response.json();
      if (data.Response === "False") throw new Error(data.Error);
      setMovies(data.Search);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    getData();
  }, [query]);
  return (
    <div className="box">
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </div>
  );
}
function Movie({ movie }) {
  const navigate = useNavigate();

  function handelClick() {
    console.log("hello");
    navigate("/");
  }
  return (
    <li onClick={handelClick}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
