import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const options = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export const getTrendingMovies = async () => {
  const url = `${BASE_URL}/trending/movie/day?language=en-US`;
  const response = await axios.get(url, options);
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?language=en-US`;
  const response = await axios.get(url, options);
  return response.data;
};

export const getConfigurationDetails = async () => {
  const url = `${BASE_URL}/configuration`;
  const response = await axios.get(url, options);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/credits?language=en-US`;
  const response = await axios.get(url, options);
  return response.data.cast;
};


export const getReviews = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/reviews?language=en-US`;
  const response = await axios.get(url, options);
  return response.data.results;
};

export const searchMovies = async (query) => {
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&include_adult=false&page=1`;
  const response = await axios.get(url, options);
  return response.data.results;
};

