import React, { useEffect, useState } from 'react'
import { searchMovies } from '../../services/api'
import { useLocation } from 'react-router-dom';
import s from "./MoviesPage.module.css"
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';


const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("query") || "";
    const location = useLocation();

    const handleSearch =  (e) => {
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
            <form onSubmit={ handleSearch }>
                <input
                    type="text"
                    name="query"
                    defaultValue={query}
                    placeholder="Search for a movie"
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {movies.length === 0 && query && !loading && (
                <p style={{ color: "red" }}>No movies found for "{query}".</p>
            )}

            
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage
