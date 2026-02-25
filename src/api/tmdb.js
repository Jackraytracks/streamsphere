import axios from 'axios'

// VITE CHANGE: Vite uses import.meta.env.VITE_* instead of process.env.REACT_APP_*
// In your .env file, rename REACT_APP_TMDB_API_KEY to VITE_TMDB_API_KEY
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'ba6b9f57897cfd73db9757a48968f882'
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: API_KEY
  }
})

export const fetchPopularMovies = async () => {
  try {
    const response = await apiClient.get('/movie/popular')
    return response.data.results
  } catch (error) {
    throw new Error(`Failed to fetch popular movies: ${error.message}`)
  }
}

export const fetchMovieDetails = async (id) => {
  try {
    const response = await apiClient.get(`/movie/${id}`, {
      params: { append_to_response: 'videos' }
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch movie details: ${error.message}`)
  }
}

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await apiClient.get('/discover/movie', {
      params: { with_genres: genreId }
    })
    return response.data.results
  } catch (error) {
    throw new Error(`Failed to fetch movies by genre: ${error.message}`)
  }
}

export const searchMovies = async (query) => {
  if (!query || query.trim() === '') return []
  try {
    const response = await apiClient.get('/search/movie', {
      params: { query: query.trim() }
    })
    return response.data.results
  } catch (error) {
    throw new Error(`Failed to search movies: ${error.message}`)
  }
}

export const fetchGenres = async () => {
  try {
    const response = await apiClient.get('/genre/movie/list')
    return response.data.genres
  } catch (error) {
    throw new Error(`Failed to fetch genres: ${error.message}`)
  }
}

export const fetchTrendingMovies = async () => {
  try {
    const response = await apiClient.get('/trending/movie/week')
    return response.data.results
  } catch (error) {
    throw new Error(`Failed to fetch trending movies: ${error.message}`)
  }
}
