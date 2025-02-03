import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import MovieDetails from "./pages/moviedetails";
import LogIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import FavouirtesMovie from "./pages/favouritemovie";

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
    {
      path: "/log-in",
      element: <LogIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/fav-movie",
      element: <><FavouirtesMovie /></>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
