import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as movieAPI from "../API/FetchData";

// Async Thunks for each API operation
export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await movieAPI.getAllMovies();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async (_, { rejectWithValue }) => {
    try {
      return await movieAPI.getPopularMovies();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNewestMovies = createAsyncThunk(
  "movies/fetchNewest",
  async (_, { rejectWithValue }) => {
    try {
      return await movieAPI.getNewestMovies();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  "movies/fetchById",
  async (imdbID, { rejectWithValue }) => {
    try {
      return await movieAPI.getMovieById(imdbID);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchMovies = createAsyncThunk(
  "movies/search",
  async (searchQuery, { rejectWithValue }) => {
    try {
      return await movieAPI.getMovieBySearch(searchQuery);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const filterMoviesByGenre = createAsyncThunk(
  "movies/filterByGenre",
  async (genre, { rejectWithValue }) => {
    try {
      return await movieAPI.filterByGenre(genre);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const filterMoviesByLanguage = createAsyncThunk(
  "movies/filterByLanguage",
  async (language, { rejectWithValue }) => {
    try {
      return await movieAPI.filterByLanguage(language);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllGenres = createAsyncThunk(
  "movies/fetchAllGenres",
  async (_, { rejectWithValue }) => {
    try {
      return await movieAPI.getAllGenres();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllLanguages = createAsyncThunk(
  "movies/fetchAllLanguages",
  async (_, { rejectWithValue }) => {
    try {
      return await movieAPI.getAllLanguages();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createMovie = createAsyncThunk(
  "movies/create",
  async (movieData, { rejectWithValue }) => {
    try {
      return await movieAPI.addMovie(movieData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movies/update",
  async ({ id, movieData }, { rejectWithValue }) => {
    try {
      return await movieAPI.editMovie(id, movieData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeMovie = createAsyncThunk(
  "movies/delete",
  async (imdbID, { rejectWithValue }) => {
    try {
      await movieAPI.deleteMovie(imdbID);
      return imdbID;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addReview = createAsyncThunk(
  "movies/addReview",
  async ({ id, review }, { rejectWithValue }) => {
    try {
      return await movieAPI.addReviewToMovie(id, review);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allMovies: [],
  popularMovies: [],
  newestMovies: [],
  filteredMovies: [],
  currentMovie: null,
  genres: [],
  languages: [],
  searchResults: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  adminStatus: movieAPI.checkIfAdminLogged(),
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearFilteredMovies: (state) => {
      state.filteredMovies = [];
    },
    adminLogin: (state) => {
      state.adminStatus = true;
    },
    adminLogout: (state) => {
      state.adminStatus = false;
      movieAPI.handleSignOutAdmin();
    },
  },
  extraReducers: (builder) => {
    // First handle all specific cases with addCase
    builder
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allMovies = action.payload;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularMovies = action.payload;
      })
      .addCase(fetchNewestMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newestMovies = action.payload;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentMovie = action.payload;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(filterMoviesByGenre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredMovies = action.payload;
      })
      .addCase(filterMoviesByLanguage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredMovies = action.payload;
      })
      .addCase(fetchAllGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genres = action.payload;
      })
      .addCase(fetchAllLanguages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.languages = action.payload;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allMovies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.allMovies.findIndex(
          (movie) => movie.imdbID === action.payload.imdbID
        );
        if (index !== -1) {
          state.allMovies[index] = action.payload;
        }
        if (state.currentMovie?.imdbID === action.payload.imdbID) {
          state.currentMovie = action.payload;
        }
      })
      .addCase(removeMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allMovies = state.allMovies.filter(
          (movie) => movie.imdbID !== action.payload
        );
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.currentMovie?.imdbID === action.payload.imdbID) {
          state.currentMovie = action.payload;
        }
      });

    // Then add matchers for generic cases
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const {
  clearCurrentMovie,
  clearSearchResults,
  clearFilteredMovies,
  adminLogin,
  adminLogout,
} = movieSlice.actions;

export default movieSlice.reducer;

// Selectors
export const selectAllMovies = (state) => state.movies.allMovies;
export const selectPopularMovies = (state) => state.movies.popularMovies;
export const selectNewestMovies = (state) => state.movies.newestMovies;
export const selectCurrentMovie = (state) => state.movies.currentMovie;
export const selectGenres = (state) => state.movies.genres;
export const selectLanguages = (state) => state.movies.languages;
export const selectSearchResults = (state) => state.movies.searchResults;
export const selectFilteredMovies = (state) => state.movies.filteredMovies;
export const selectMoviesStatus = (state) => state.movies.status;
export const selectMoviesError = (state) => state.movies.error;
export const selectAdminStatus = (state) => state.movies.adminStatus;
