import React, { useEffect, useState } from 'react'
import { searchMovies } from '../../services/api'
import {Link, useLocation } from 'react-router-dom';
import s from "./MoviesPage.module.css"
import { useSearchParams } from 'react-router-dom';


const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("query") || "";
    const location = useLocation();

    const handleSeach =  (e) => {
        e.preventDefault();
        const form = e.target;
        const searchQuery = form.elements.query.value.trim();
        if (searchQuery) {
            setSearchParams({query:searchQuery})
        } else {
            setSearchParams({})
        }
    }
  
    useEffect(() => {
        if (!query) return
        async function fetchMovie() {
            setLoading(true);
            setError("");
            try {
                const results = await searchMovies(query);
                setMovies(results);
            } catch (error) {
                setError('Error fetching search results');
            } finally {
                setLoading(false)
            }
        }
        fetchMovie();
},[query])

    return (
        <div className={s.content}>
            <h2>Search Movies</h2>
            <form onSubmit={handleSeach}>
                <input
                    type="text"
                    name="query"
                    defaultValue={query}
                    placeholder='Search for a movie'
                />
                <button type="submit" disabled={loading}>
    {loading ? "Searching..." : "Search"}
  </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {movies.length === 0 && query && !loading && (
                <p style={{ color: "red" }}>No movies found for "{query}".</p>
            )}
            <div style={{ display: 'flex', flexWrap: "wrap", gap: "20px" }}>
                {movies.map((movie) => {
                    const posterPath = movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'default-image.jpg';
                    return (
                        <div key={movie.id} style={{ width: '200px' }}>
                            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                                <img
                                    src={posterPath}
                                    alt={movie.title}
                                    style={{ width: '100%', borderRadius: '8px' }}
                                />
                                <h3>{movie.title}</h3>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MoviesPage
