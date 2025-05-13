import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movieSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.timestamp"], // Example for non-serializable values in actions
        // Ignore these paths in the state
        ignoredPaths: ["auth.token", "movies.someNonSerializableField"], // Add any non-serializable fields here
      },
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools only in development
});

export default store;
