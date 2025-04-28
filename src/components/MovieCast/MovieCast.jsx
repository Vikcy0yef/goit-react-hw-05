import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../services/api';
import s from "./MovieCast.module.css"

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast ] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
        const fetchCast = async () => {
            try {
                const data = await getMovieCredits(movieId);
                setCast(data.cast);
            } catch (error) {
                setError('Failed to load cast information.')
            }
        };
        fetchCast();
    }, [movieId]);

    if (error) return <p style={{ color: "red" }}> {error} </p>;
    if(!cast.length)return <p>No cast information available.</p>;
  
    return (
    <ul className={s.list}>
            {cast.map((actor) => (
                <li key={actor.cast_id} className={s.item}>
                    {actor.profile_path && (
                        <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name}
                        style={{width:"100px", borderRadius:"10px"}}/>
                    )}
                    <p><b>{actor.name}</b>as {actor.character}</p>
          </li>
      ))}
    </ul>
  )
}

export default MovieCast
