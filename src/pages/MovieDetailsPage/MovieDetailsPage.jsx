import { Outlet, useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from 'react';
import { getMovieDetails } from "../../services/api"; // ПРАВИЛЬНИЙ імпорт

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [movie, setMovie] = useState(null);

    const backLink = location.state?.from || "/movies"; // виправила трохи тут /movies

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieDetails(movieId);
                setMovie(data);
            } catch (error) {
                console.error('Error loading movie details:', error);
            }
        };
        fetchMovie();
    }, [movieId]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <button onClick={() => navigate(backLink)}>← Go back</button>
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: '300px', borderRadius: '10px' }}
                />
                <div>
                    <h2>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
                    <p><b>Score:</b> {Math.round(movie.vote_average * 10)}%</p>
                    <p><b>Overview:</b> {movie.overview}</p>
                    <p><b>Genres:</b> {movie.genres.map(g => g.name).join(", ")}</p>
                </div>
            </div>
            <hr />
            <h3>Additional Information</h3>
            <ul style={{listStyleType: "none"}}>
                <li>
                    <Link to="cast" state={{ from: backLink }}>Cast</Link>
                </li>
                <li>
                    <Link to="reviews" state={{ from: backLink }}>Reviews</Link>
                </li>
            </ul>
            <hr />
            <Outlet />
        </div>
    );
}

export default MovieDetailsPage;

