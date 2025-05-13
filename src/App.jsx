import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/HomePage/Home";
import Movies from "./components/Movies";
import About from "./components/AboutUs";
import Notfound from "./components/Notfound";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import { ContactUs } from "./components/ContactUs/ContactUs";
import { MoviesAndShows } from "./components/MoviesAndShows/MoviesAndShows";
import AboutUs from "./components/AboutUs";
import DashBoard from "./components/Dashboard/Dashboard";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import MovieForm from "./components/MovieForm/MovieForm";
import Faq from "./components/Support/Faq";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movies&shows",
        element: <MoviesAndShows />,
      },
      {
        path: "moviedetails/:id",
        element: <MovieDetails />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "admin",
        element: <AdminLogin />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: "movies/:id/edit",
        element: (
          <ProtectedRoute>
            <MovieForm />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
