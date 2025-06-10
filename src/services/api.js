import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmMxMzk1NzNlYjU5MmI1NWVmOWVkMmZjMjA0ZTMyMSIsIm5iZiI6MTc0OTQ5ODU5MS42OTI5OTk4LCJzdWIiOiI2ODQ3M2FkZmMwNTMzZDk1OGMxZWFjMDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.DKZ4YpfT0EgysiRYH6BTuzlO2T6zybOAOorXjS4BG3E';

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

