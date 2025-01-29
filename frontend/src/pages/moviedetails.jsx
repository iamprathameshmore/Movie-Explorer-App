import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
  const { "movie-name": movieName } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?t=${movieName}&apikey=5906cda4`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovieDetails(data);
        } else {
          setMovieDetails(null);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [movieName]);

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

  return (
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
              <span className="font-semibold text-gray-400">IMDb Rating:</span>
              <span className="text-yellow-400">
                {movieDetails.imdbRating}/10
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
