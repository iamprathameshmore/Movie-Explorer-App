import React from "react";

function MovieComp({key, Poster, Title, Year}) {
    return <div
    key={key}
    className="relative group shadow-lg rounded-lg overflow-hidden"
  >
    <div className="w-full h-80 sm:h-72 bg-gray-200">
      <img
        src={Poster}
        alt={Title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
      <p className="text-lg font-bold">
        {Title} ({Year})
      </p>
      <p className="text-sm text-gray-300">
        IMDb ID: {key}
      </p>
    </div>
  </div>
    
}

export default MovieComp;