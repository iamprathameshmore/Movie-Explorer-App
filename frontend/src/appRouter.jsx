import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import MovieDetails from "./pages/moviedetails";

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:movie-name",
      element: <MovieDetails />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
