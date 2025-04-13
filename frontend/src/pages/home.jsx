import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAuthenticated, getUserEmail, logout } from "../auth.js";
import MovieComp from "./comp/mov-comp.jsx";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("Avengers");
  const navigate = useNavigate();
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
  }, [searchQuery]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.email);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMovieClick = (movieName) => {
    navigate(`/${movieName}`);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="bg-zinc-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full text-white flex justify-between items-center p-4 shadow-md">
        <div className="text-lg font-semibold">MovieApp</div>
        <div className="flex justify-between">
          {isAuthenticated() ? (
            <>
              <span className="px-4 py-2">{userEmail}</span>
              <span className="px-4 py-2">Favouirtes</span>
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

      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-xs  font-thin text-indigo-600">
          Created by @Iamprathameshmore
        </h2>

        <p className="mx-auto mt-2 max-w-2xl text-center text-3xl font-semibold tracking-tight text-gray-100 sm:text-4xl">
          Explore the World of Movies!
        </p>

        <div className="mt-10 flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full sm:w-96 px-4 py-1 border   text-sm text-white rounded-none placeholder:text-indigo-800"
            placeholder="Search for a movie..."
          />
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              
              <MovieComp 
              key={movie.imdbID}
              Title={movie.Title}
              Poster={movie.Poster}
              Year={movie.Year}
              />
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

export default Home;
