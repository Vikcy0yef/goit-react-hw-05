
import axios from "axios";


const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzAxYzhlNDMzNTNhODQzOTdiMWIwYWUwN2ZjNGIyNyIsIm5iZiI6MTc0MDQxNDA3OS44NDksInN1YiI6IjY3YmM5YzdmYTIzOTI5YWMyOGJmMTJlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WabKH0PhR1bRb6ZjSyRrVdBs5kO80ghAYETDwPIim7A';

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  }
};

export async function getTrendingMovies() {
  const url = `${API_URL}/trending/movie/day?language=en-US`;
  try {
    const response = await axios.get(url, options);
    if (response.data.results) {
      return response.data.results;
    } else {
      throw new Error('No trending movies found');
    }
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    throw error;  
  }
}


export async function searchMovies(query) {
  const url = `${API_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
  try {
    const response = await axios.get(url, options);
    console.log(response.data); 
    if (response.data.results) {
      return response.data.results;
    } else {
      throw new Error('No movies found');
    }
  } catch (error) {
    console.error('Error searching for movies:', error.message);
    throw error; 
  }
}


export async function getMovieDetails(movieId) {
  const url = `${API_URL}/movie/${movieId}?language=en-US`;
  try {
    const response = await axios.get(url, options);
    if (response.data) {
      return response.data;
    } else {
      throw new Error('Movie details not found');
    }
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    throw error;  
  }
};


export async function getMovieCredits(movieId) {
  const url = `${API_URL}/movie/${movieId}/credits?language=en-US`;
  try {
    const response = await axios.get(url, options);
    if (response.data) {
      return response.data;
    } else {
      throw new Error('Movie credits not found');
    }
  } catch (error) {
    console.error('Error fetching movie credits:', error.message);
    throw error;
  }
}

export async function getMovieReviews(movieId) {
  const url = `${API_URL}/movie/${movieId}/reviews?language=en-US&page=1`;
  try {
    const response = await axios.get(url, options);
    if (response.data.results) {
      return response.data.results;
    } else {
      throw new Error('No reviews found');
    }
  } catch (error) {
    console.error('Error fetching movie reviews:', error.message);
    throw error;
  }
}
