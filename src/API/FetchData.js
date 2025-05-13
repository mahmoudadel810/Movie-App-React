import axios from "axios";

//Base URL
const baseUrl = "http://localhost:3000/";

//get all movies
export const getAllMovies = async () => {
  try {
    const response = await axios.get(`${baseUrl}movies`);
    return response.data; // Returns only the data payload
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error; // Re-throw for component-level handling
  }
};
//get popular movies
export const getPopularMovies = async () => {
  let response = await getAllMovies();
  let data = await response.data;

  let populerMovie = data.filter((movie) => movie.Popular == "True");
  return populerMovie;
};

//get newest movies
export const getNewestMovies = async () => {
  try {
    const response = await getAllMovies();
    const data = response.data;

    const newestMovies = data.filter((movie) => Number(movie.Year) >= 2023);

    return newestMovies;
  } catch (error) {
    console.error("Error fetching newest movies:", error);
    return [];
  }
};

//get movie by id
export const getMovieById = async (imdbID) => {
  try {
    const response = await axios.get(`${baseUrl}movies/${imdbID}`);
    return response.data; // Return the actual movie data
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error; // Re-throw to let calling code handle it
  }
};

//get movie by search
export const getMovieBySearch = async (searchQuery) => {
  try {
    // Fetch all movies first
    const response = await axios.get(`${baseUrl}movies`);
    const allMovies = response.data;

    // Filter movies by name (case insensitive)
    const filteredMovies = allMovies.filter((movie) =>
      movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredMovies;
  } catch (error) {
    console.error("Error fetching or filtering movies:", error);
    throw error;
  }
};

//get movie by type (series,movie)
export const getMovieByType = (type) =>
  axios.get(`${baseUrl}movies?Type=${type}`);

//Delete Movie by ID
export const deleteMovie = async (imdbID) => {
  try {
    const response = await axios.delete(`${baseUrl}movies/${imdbID}`);
    return response.data; // Typically returns success message or deleted movie data
  } catch (error) {
    console.error(`Error deleting movie ${imdbID}:`, error);
    if (error.response) {
      // Server responded with error status (4xx/5xx)
      throw new Error(error.response.data.message || "Failed to delete movie");
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("No response from server - network error");
    } else {
      // Something else went wrong
      throw new Error("Error setting up delete request");
    }
  }
};

//ADD MOVIE
// In your API/FetchData.js
export const addMovie = async (movieData) => {
  const response = await axios.post(`${baseUrl}movies`, movieData);
  // Return only the data part
  return response.data;
};

//edit movie
export const editMovie = async (id, movie) => {
  try {
    const response = await axios.put(`${baseUrl}movies/${id}`, movie);
    return response.data; // Returns the updated movie data from server
  } catch (error) {
    console.error(`Error updating movie ${id}:`, error);
    throw error; // Re-throw to allow component-level error handling
  }
};

//add review
export const addReviewToMovie = async (id, review) => {
  try {
    const response = await axios.get(`${baseUrl}movies/${id}`);
    const movie = response.data;

    if (!movie.Ratings) {
      movie.Ratings = [];
    }
    movie.Ratings.push(review);

    const updateResponse = await axios.put(`${baseUrl}movies/${id}`, movie);

    console.log("Review added successfully:", updateResponse.data);
    return updateResponse.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

//check Admin Password
export const checkAdminPassword = async (password) => {
  let response = await axios.get(`${baseUrl}admin/1`);
  let data = await response.data;
  if (data.password == password) {
    localStorage.setItem("user", "admin");
    return true;
  } else {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }
    return false;
  }
};

// Check if admin is logged
export const checkIfAdminLogged = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};

//filter movies by genre
export const filterByGenre = async (genre) => {
  try {
    const response = await getAllMovies();
    const data = response.data;
    const filtered = data.filter((movie) =>
      movie.Genre?.some((g) => g.toLowerCase() === genre.toLowerCase())
    );

    return filtered;
  } catch (error) {
    console.error("Error filtering by genre:", error);
    return [];
  }
};

// get all Genre
export const getAllGenres = async () => {
  try {
    const response = await getAllMovies();

    // More flexible response handling
    const moviesArray = Array.isArray(response)
      ? response
      : Array.isArray(response?.data)
      ? response.data
      : [];

    if (moviesArray.length === 0) {
      console.warn("No movies data received");
      return [];
    }

    // Extract and process genres
    const allGenres = moviesArray
      .flatMap((movie) => {
        // Handle different possible Genre field structures
        if (!movie?.Genre) return [];
        if (Array.isArray(movie.Genre)) return movie.Genre;
        if (typeof movie.Genre === "string") return movie.Genre.split(",");
        return [];
      })
      .map((genre) => String(genre).trim()) // Ensure string and trim
      .filter((genre) => genre.length > 0); // Remove empty

    // Remove duplicates (case-sensitive)
    const uniqueGenres = [...new Set(allGenres)];

    return uniqueGenres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

//filter all Language
export const filterByLanguage = async (language) => {
  try {
    const response = await getAllMovies();
    const movies = response.data;

    const filteredMovies = movies.filter(
      (movie) =>
        Array.isArray(movie.Language) &&
        movie.Language.some(
          (lang) => lang.trim().toLowerCase() === language.trim().toLowerCase()
        )
    );

    return filteredMovies;
  } catch (error) {
    console.error("Error filtering movies by language:", error);
    return [];
  }
};

// get all Language
export const getAllLanguages = async () => {
  try {
    const response = await getAllMovies();
    const movies = response.data;

    const languageSet = new Set();

    movies.forEach((movie) => {
      if (Array.isArray(movie.Language)) {
        movie.Language.forEach((lang) => {
          languageSet.add(lang.trim());
        });
      }
    });

    return Array.from(languageSet).sort();
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
};
//handle signout admin
export const handleSignOutAdmin = () => localStorage.removeItem("user");
