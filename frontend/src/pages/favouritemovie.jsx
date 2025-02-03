import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserEmail, logout } from "../auth.js";

function FavouirtesMovie() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("Avengers");
  const userEmail = getUserEmail();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${searchQuery}&apikey=5906cda4`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies list:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movieName) => {
    navigate(`/${movieName}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/')
  };

  return (
    <div className="bg-zinc-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full text-white flex justify-between items-center p-4 shadow-md">
        <div className="text-lg font-semibold">MovieApp</div>
        <div className="flex justify-between">
          <>
            <span className="px-4 py-2">{userEmail}</span>
            <span className="px-4 py-2">Favouirtes</span>
            <button onClick={handleLogout} className="px-4 py-2">
              Logout
            </button>
          </>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-xs  font-thin text-indigo-600">
          Created by @Iamprathameshmore
        </h2>

        <p className="mx-auto mt-2 max-w-2xl text-center text-3xl font-semibold tracking-tight text-gray-100 sm:text-4xl">
          List of Your Faviourites Movies 💗
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="relative group shadow-lg rounded-lg overflow-hidden"
                onClick={() => handleMovieClick(movie.Title)}
              >
                <div className="w-full h-80 sm:h-72 bg-gray-200">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-lg font-bold">
                    {movie.Title} ({movie.Year})
                  </p>
                  <p className="text-sm text-gray-300">
                    IMDb ID: {movie.imdbID}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No movies found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavouirtesMovie;
