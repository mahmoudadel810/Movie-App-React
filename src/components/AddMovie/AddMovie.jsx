/** @format */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SharedBtn from "./SharedBtn";

const AddMovie = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  // Initialize the component with sample movie data
  useEffect(() => {
    // For demo purposes, add some sample movies
    // setMovies([
    //   {
    //     id: "1",
    //     Title: "just dummy test ",
    //     Year: "2023",
    //     Genre: ["Action", "Adventure"]
    //   },
    //   {
    //     id: "2",
    //     Title: " bo7a ",
    //     Year: "2005",
    //     Genre: ["Drama", "Thriller"]
    //   }
    // ]);
  }, []);

  // Navigate to the add movie form
  const handleAddMovie = () => {
    navigate("/movies/0/edit");
  };

  // Navigate to the edit movie form with the selected movie ID
  const handleEditMovie = (id) => {
    navigate(`/movies/${id}/edit`);
  };

  const handleDeleteMovie = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      setMovies(movies.filter((movie) => movie.id !== id));
    }
  };

  //Movie Management Template
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Movies Management </h1>
        <button
          onClick={handleAddMovie}
          className="btn btn-danger"
          style={{ borderRadius: "20px" }}>
          Add Movie
        </button>
      </div>

      {/* no movies ,, just for me */}
      {movies.length === 0 ? (
        <div className="alert alert-dark">
          The movies list is empty. Click "Add Movie" to create one.
        </div>
      ) : (
        // if movies list is not empty , just if there is movies in my DEMO TO SEE THE FLOW
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-6 mb-4">
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {movie.Year}
                  </h6>
                  <div className="mb-2">
                    {movie.Genre &&
                      movie.Genre.map((genre, idx) => (
                        <span key={idx} className="badge bg-secondary me-1">
                          {genre}
                        </span>
                      ))}
                  </div>
                  <div className="d-flex mt-3">
                    <button
                      onClick={() => handleEditMovie(movie.id)}
                      className="btn btn-sm btn-outline-light me-2"
                      style={{ borderRadius: "20px" }}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMovie(movie.id)}
                      className="btn btn-sm btn-outline-danger"
                      style={{ borderRadius: "20px" }}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddMovie;
