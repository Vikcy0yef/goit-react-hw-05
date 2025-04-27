import React, { useEffect, useState } from 'react';
import  {getTrendingMovies}  from "../../services/api";
import { Link } from 'react-router-dom';
import s from "./HomePage.module.css"

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getTrendingMovies();
        setMovies(moviesData);
      } catch (error) {
        setError('Failed to fetch trending movies');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color:"red"}}>{error}</p>
   
  
  return (
     <div className={s.wrapper}>
      <h1 className={s.title}>Trending Movies</h1>
      <div className={s.grid}>
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`} className={s.movieCard}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={s.poster}
            />
            <h3 className={s.movieTitle}>{movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage
