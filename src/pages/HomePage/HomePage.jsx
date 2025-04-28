import React, { useEffect, useState } from 'react';
import  {getTrendingMovies}  from "../../services/api";
import MovieList from '../../components/MovieList/MovieList';
import { useLocation } from 'react-router-dom';



const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    
const location =useLocation()

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
     <div >
      <h1 >Trending Movies</h1>
    <MovieList movies={movies} location={location} />
    </div>
  );
}

export default HomePage
