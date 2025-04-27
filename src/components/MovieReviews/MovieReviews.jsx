import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api'; 

const MovieReviews = () => {
    const { movieId } = useParams();
    const [revievs, setReviews] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getMovieReviews(movieId);
                setReviews(data.results);
            } catch (error) {
                setError('Failed to load reviews.');
            }
        };
        fetchReviews();
    },[movieId])
  
  if (error) return <p style={{color: 'red'}}>{error}</p>;
    if (!revievs?.length) return <p>No reviews found.</p>;
    
    return (
        <ul>
            {revievs.map(reviews => (
                <li key={reviews.id} style={{ marginBottom: '20px' }}>
                    <h4>Author:{reviews.author}</h4>
                    <p>{reviews.content}</p>
                </li>
            ))}
      
    </ul>
  )
}

export default MovieReviews
