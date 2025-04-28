import React from 'react';
import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css"

const MovieList = ({movies}) => {
    const location = useLocation();

    if (!MovieList.length) {
        return <p>No movies found.</p>
    }

  return (
   <div className={s.list}>
      {movies.map((movie) => {
        const posterPath = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "default-image.jpg";

        return (
          <div key={movie.id} className={s.card}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <img
                src={posterPath}
                alt={movie.title}
                className={s.image}
              />
              <h3 className={s.title}>{movie.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList
