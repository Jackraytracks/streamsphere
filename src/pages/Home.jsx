import React, { useMemo } from 'react'
import { fetchPopularMovies, fetchTrendingMovies } from '../api/tmdb'
import { useFetch } from '../hooks/useFetch'
import Banner from '../components/Banner'
import MovieGrid from '../components/MovieGrid'
import LoadingSpinner from '../components/LoadingSpinner'
import { Alert } from 'react-bootstrap'
import './Home.css'

const Home = () => {
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(fetchPopularMovies)
  const { data: trending, loading: trendingLoading, error: trendingError } = useFetch(fetchTrendingMovies)

  const featuredMovie = useMemo(() => {
    if (trending && trending.length > 0) {
      return trending[Math.floor(Math.random() * trending.length)]
    }
    return null
  }, [trending])

  const loading = moviesLoading || trendingLoading
  const error = moviesError || trendingError

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="netflix-home">
        <Alert variant="danger" className="m-4">
          <Alert.Heading>Error Loading Movies</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </div>
    )
  }

  return (
    <div className="netflix-home">
      {featuredMovie && <Banner movie={featuredMovie} />}
      <div className="netflix-content">
        {trending && <MovieGrid movies={trending} title="Trending Now" isLarge />}
        {movies && <MovieGrid movies={movies} title="Popular on Netflix" />}
        {movies && <MovieGrid movies={[...movies].reverse()} title="Watch Again" />}
      </div>
    </div>
  )
}

export default Home
