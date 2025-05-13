/** @format */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SharedBtn from "./../../SharedBtn";
import validateMovie from "./../../validations/movieValidation";
import {
  createMovie,
  updateMovie,
  fetchMovieById,
} from "../../Store/movieSlice";
import { selectCurrentMovie, selectMoviesStatus } from "../../Store/movieSlice";
import { checkAdminSession, selectIsAdmin } from "../../Store/authSlice";

const MovieForm = () => {
  const { id } = useParams(); // Get id from URL params
  const isAdmin = useSelector(selectIsAdmin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!isAdmin) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Unauthorized access. Please login as admin.
        </div>
      </div>
    );
  }

  // Redux state
  const currentMovie = useSelector(selectCurrentMovie);
  const status = useSelector(selectMoviesStatus);

  // if id is 0 or null/undefined, we're adding a new movie, otherwise editing
  const isAddMode = id === "0";

  // Initial state for the movie form with default values
  const initialFormData = {
    Title: "",
    Year: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Genre: [""],
    Director: [""],
    Writer: [""],
    Actors: ["", "", ""],
    Plot: "",
    Language: [""],
    Country: [""],
    Awards: "",
    Poster: "",
    Ratings: [],
    Metascore: "N/A",
    imdbRating: "",
    imdbVotes: "",
    Type: "movie",
    DVD: "N/A",
    BoxOffice: "",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
    Popular: "false",
    Trailer: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({}); // For validation errors

  // Load movie data when editing
  useEffect(() => {
    dispatch(checkAdminSession());
    if (!isAddMode && id !== "0") {
      dispatch(fetchMovieById(id));
    }
  }, [id, isAddMode, dispatch]);

  // Update form when currentMovie changes
  useEffect(() => {
    if (currentMovie && !isAddMode) {
      setFormData(currentMovie);
    }
  }, [currentMovie, isAddMode]);

  // Handle changes to single-value form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes to array-based form fields (e.g., genres, actors)
  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    const newArray = [...formData[field]];
    newArray[index] = value;

    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  // Add a new empty field to array-based inputs
  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  // Remove a field from array-based inputs
  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      const newArray = [...formData[field]];
      newArray.splice(index, 1);
      setFormData((prev) => ({
        ...prev,
        [field]: newArray,
      }));
    }
  };

  // Validate form data using the movie validation schema
  const validate = () => {
    const { error } = validateMovie(formData);
    if (!error) return true;
    console.log(error);

    const newErrors = {};
    error.details.forEach((detail) => {
      newErrors[detail.path[0]] = detail.message;
    });
    setErrors(newErrors);
    return false;
  };

  // Handle form submission for both new and existing movies
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        if (isAddMode) {
          await dispatch(createMovie(formData)).unwrap();
        } else {
          await dispatch(updateMovie({ id, movieData: formData })).unwrap();
        }
        navigate("/dashboard");
      } catch (error) {
        console.error("Operation failed:", error);
      }
    }
  };

  // Handle form cancellation and return to movie list
  const handleCancel = () => {
    navigate("/dashboard");
  };

  if (status === "loading" && !isAddMode) {
    return <div>Loading movie data...</div>;
  }

  //Movie Form Template
  return (
    <div className="container">
      <h2 className="mb-4">{isAddMode ? "Add New Movie" : "Edit Movie"}</h2>
      <form
        onSubmit={handleSubmit}
        className="manegment__form p-5 rounded-2 shadow-lg"
      >
        <div className="mb-3">
          <label htmlFor="Title" className="form-label">
            Title*
          </label>
          <input
            type="text"
            id="Title"
            name="Title"
            className={`form-control ${errors.Title ? "is-invalid" : ""}`}
            value={formData.Title}
            onChange={handleChange}
          />
          {errors.Title && (
            <div className="invalid-feedback">{errors.Title}</div>
          )}
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="Year" className="form-label">
              Year*
            </label>
            <input
              type="text"
              id="Year"
              name="Year"
              className={`form-control ${errors.Year ? "is-invalid" : ""}`}
              value={formData.Year}
              onChange={handleChange}
            />
            {errors.Year && (
              <div className="invalid-feedback">{errors.Year}</div>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="Rated" className="form-label">
              Rated
            </label>
            <input
              type="text"
              id="Rated"
              name="Rated"
              className="form-control"
              value={formData.Rated}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="Released" className="form-label">
              Released
            </label>
            <input
              type="text"
              id="Released"
              name="Released"
              className="form-control"
              value={formData.Released}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Runtime" className="form-label">
            Runtime
          </label>
          <input
            type="text"
            id="Runtime"
            name="Runtime"
            className="form-control"
            value={formData.Runtime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="BoxOffice" className="form-label">
            BoxOffice
          </label>
          <input
            type="text"
            id="BoxOffice"
            name="BoxOffice"
            className="form-control"
            value={formData.BoxOffice}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Genre*</label>
          {formData.Genre.map((genre, index) => (
            <div key={`genre-${index}`} className="input-group mb-2">
              <input
                type="text"
                className={`form-control ${errors.Genre ? "is-invalid" : ""}`}
                value={genre}
                onChange={(e) => handleArrayChange(e, "Genre", index)}
              />
              {formData.Genre.length > 1 && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeArrayItem("Genre", index)}
                  title="Remove Genre"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          ))}
          {errors.Genre && (
            <div className="text-danger small mb-2">{errors.Genre}</div>
          )}
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => addArrayItem("Genre")}
            title="Add Genre"
          >
            <i className="bi bi-plus"></i> Add Genre
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Director*</label>
          {formData.Director.map((director, index) => (
            <div key={`director-${index}`} className="input-group mb-2">
              <input
                type="text"
                className={`form-control ${
                  errors.Director ? "is-invalid" : ""
                }`}
                value={director}
                onChange={(e) => handleArrayChange(e, "Director", index)}
              />
              {formData.Director.length > 1 && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeArrayItem("Director", index)}
                  title="Remove Director"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          ))}
          {errors.Director && (
            <div className="text-danger small mb-2">{errors.Director}</div>
          )}
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => addArrayItem("Director")}
            title="Add Director"
          >
            <i className="bi bi-plus"></i> Add Director
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Writer*</label>
          {formData.Writer.map((writer, index) => (
            <div key={`writer-${index}`} className="input-group mb-2">
              <input
                type="text"
                className={`form-control ${errors.Writer ? "is-invalid" : ""}`}
                value={writer}
                onChange={(e) => handleArrayChange(e, "Writer", index)}
              />
              {formData.Writer.length > 1 && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeArrayItem("Writer", index)}
                  title="Remove Writer"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          ))}
          {errors.Writer && (
            <div className="text-danger small mb-2">{errors.Writer}</div>
          )}
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => addArrayItem("Writer")}
            title="Add Writer"
          >
            <i className="bi bi-plus"></i> Add Writer
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Actors*</label>
          {formData.Actors.map((actor, index) => (
            <div key={`actor-${index}`} className="input-group mb-2">
              <input
                type="text"
                className={`form-control ${errors.Actors ? "is-invalid" : ""}`}
                value={actor}
                onChange={(e) => handleArrayChange(e, "Actors", index)}
              />
              {formData.Actors.length > 1 && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeArrayItem("Actors", index)}
                  title="Remove Actor"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          ))}
          {errors.Actors && (
            <div className="text-danger small mb-2">{errors.Actors}</div>
          )}
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => addArrayItem("Actors")}
            title="Add Actor"
          >
            <i className="bi bi-plus"></i> Add Actor
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="Plot" className="form-label">
            Plot*
          </label>
          <textarea
            id="Plot"
            name="Plot"
            className={`form-control ${errors.Plot ? "is-invalid" : ""}`}
            value={formData.Plot}
            onChange={handleChange}
            rows="4"
          ></textarea>
          {errors.Plot && <div className="invalid-feedback">{errors.Plot}</div>}
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Language*</label>
            {formData.Language.map((language, index) => (
              <div key={`language-${index}`} className="input-group mb-2">
                <input
                  type="text"
                  className={`form-control ${
                    errors.Language ? "is-invalid" : ""
                  }`}
                  value={language}
                  onChange={(e) => handleArrayChange(e, "Language", index)}
                />
                {formData.Language.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => removeArrayItem("Language", index)}
                    title="Remove Language"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            ))}
            {errors.Language && (
              <div className="text-danger small mb-2">{errors.Language}</div>
            )}
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={() => addArrayItem("Language")}
              title="Add Language"
            >
              <i className="bi bi-plus"></i> Add Language
            </button>
          </div>

          <div className="col-md-6">
            <label className="form-label">Country*</label>
            {formData.Country.map((country, index) => (
              <div key={`country-${index}`} className="input-group mb-2">
                <input
                  type="text"
                  className={`form-control ${
                    errors.Country ? "is-invalid" : ""
                  }`}
                  value={country}
                  onChange={(e) => handleArrayChange(e, "Country", index)}
                />
                {formData.Country.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => removeArrayItem("Country", index)}
                    title="Remove Country"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            ))}
            {errors.Country && (
              <div className="text-danger small mb-2">{errors.Country}</div>
            )}
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={() => addArrayItem("Country")}
              title="Add Country"
            >
              <i className="bi bi-plus"></i> Add Country
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="Poster" className="form-label">
            Poster URL*
          </label>
          <input
            type="text"
            id="Poster"
            name="Poster"
            className={`form-control ${errors.Poster ? "is-invalid" : ""}`}
            value={formData.Poster}
            onChange={handleChange}
          />
          {errors.Poster && (
            <div className="invalid-feedback">{errors.Poster}</div>
          )}
          {formData.Poster && (
            <div className="mt-2">
              <img
                src={formData.Poster}
                alt="Movie poster preview"
                className="img-thumbnail"
                style={{ maxHeight: "200px" }}
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="Trailer" className="form-label">
            Trailer URL*
          </label>
          <input
            type="text"
            id="Trailer"
            name="Trailer"
            className={`form-control ${errors.Trailer ? "is-invalid" : ""}`}
            value={formData.Trailer}
            onChange={handleChange}
          />
          {errors.Trailer && (
            <div className="invalid-feedback">{errors.Trailer}</div>
          )}
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="imdbRating" className="form-label">
              IMDB Rating
            </label>
            <input
              type="text"
              id="imdbRating"
              name="imdbRating"
              className={`form-control ${
                errors.imdbRating ? "is-invalid" : ""
              }`}
              value={formData.imdbRating}
              onChange={handleChange}
            />
            {errors.imdbRating && (
              <div className="invalid-feedback">{errors.imdbRating}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="Popular" className="form-label">
            Popular
          </label>
          <select
            id="Popular"
            name="Popular"
            className="form-select"
            value={formData.Popular}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="d-flex gap-2">
          <SharedBtn
            type="submit"
            className="btn btn-danger"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : isAddMode ? (
              "Add Movie"
            ) : (
              "Update Movie"
            )}
          </SharedBtn>
          <button
            type="button"
            className="btn  rounded-2 btn-outline-light"
            onClick={handleCancel}
            disabled={status === "loading"}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
