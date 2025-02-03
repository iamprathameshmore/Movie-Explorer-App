import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { isAuthenticated, getUserEmail, logout } from "../auth.js";

function MovieDetails() {
  const { "movie-name": movieName } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const userEmail = getUserEmail();
  const token = isAuthenticated(); // Get JWT token for API authentication

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?t=${movieName}&apikey=5906cda4`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovieDetails(data);
          checkFavoriteStatus(data.imdbID);
        } else {
          setMovieDetails(null);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [movieName]);

  const checkFavoriteStatus = async (imdbID) => {
    if (!isAuthenticated()) return;
    try {
      const response = await fetch("https://your-api.com/favorites", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const isFav = data.some((movie) => movie.imdbID === imdbID);
      setIsFavorite(isFav);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated()) {
      alert("You need to log in to add favorites.");
      return;
    }

    const apiUrl = isFavorite
      ? "https://your-api.com/favorites/remove"
      : "https://your-api.com/favorites/add";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imdbID: movieDetails.imdbID,
          title: movieDetails.Title,
          poster: movieDetails.Poster,
          userEmail,
        }),
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        console.error("Error updating favorites:", await response.json());
      }
    } catch (error) {
      console.error("Error adding/removing favorite:", error);
    }
  };

  if (!movieDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900">
        <svg
          className="animate-spin h-16 w-16 border-t-3 border-indigo-600 border-solid rounded-full"
          viewBox="0 0 50 50"
        >
          <circle
            className="opacity-75 text-white"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray="125.6"
            strokeDashoffset="0"
          />
        </svg>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="bg-zinc-900 h-screen">
      <div className="w-full text-white flex justify-between items-center p-4 px-12 shadow-md">
        <div className="text-lg font-semibold">MovieApp</div>
        <div className="flex justify-between">
          {isAuthenticated() ? (
            <>
              <span className="px-4 py-2">{userEmail}</span>
              <button className="px-4 py-2" onClick={handleFavoriteToggle}>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
              <button onClick={handleLogout} className="px-4 py-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="px-4 py-2 hover:text-indigo-600">
                <Link to="/log-in">Log In</Link>
              </button>
              <button className="px-4 py-2 hover:text-indigo-600">
                <Link to="/sign-up">Sign Up</Link>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="py-10 px-6 bg-zinc-900 min-h-screen flex flex-col items-center">
        <div className="max-w-4xl w-full bg-zinc-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-center mb-6">
            <img
              src={movieDetails.Poster}
              alt={movieDetails.Title}
              className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-xl"
            />
          </div>

          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-400">
              {movieDetails.Title} ({movieDetails.Year})
            </h2>
            <p className="mt-4 text-lg text-gray-300">{movieDetails.Plot}</p>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-400">Genre:</span>
                <span className="text-indigo-300">{movieDetails.Genre}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-400">Director:</span>
                <span className="text-indigo-300">{movieDetails.Director}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-400">Cast:</span>
                <span className="text-indigo-300">{movieDetails.Actors}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-400">
                  IMDb Rating:
                </span>
                <span className="text-yellow-400">
                  {movieDetails.imdbRating}/10
                </span>
              </div>
            </div>

            {isAuthenticated() && (
              <button
                onClick={handleFavoriteToggle}
                className={`mt-6 px-6 py-2 text-white font-semibold rounded-md ${
                  isFavorite ? "bg-red-500" : "bg-indigo-500"
                } hover:opacity-90`}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
