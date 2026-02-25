import React, { useState, useMemo } from 'react'
import { searchMovies, fetchGenres } from '../api/tmdb'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import MovieGrid from '../components/MovieGrid'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import { Form, Alert } from 'react-bootstrap'
import './Search.css'

const Search = () => {
  const [query, setQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')

  const debouncedQuery = useDebounce(query, 500)
  const { data: genres } = useFetch(fetchGenres)
  const { data: movies, loading, error } = useFetch(
    () => debouncedQuery ? searchMovies(debouncedQuery) : Promise.resolve([]),
    [debouncedQuery]
  )

  const filteredMovies = useMemo(() => {
    if (!movies) return []
    if (selectedGenre) {
      return movies.filter(movie =>
        movie.genre_ids && movie.genre_ids.includes(Number(selectedGenre))
      )
    }
    return movies
  }, [movies, selectedGenre])

  return (
    <div className="search-page">
      <h2>Search Movies</h2>
      <SearchBar onSearch={setQuery} />

      {genres && (
        <Form.Group className="mb-3">
          <Form.Label>Filter by Genre</Form.Label>
          <Form.Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
      )}

      {error && (
        <Alert variant="danger">
          <Alert.Heading>Search Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <MovieGrid
          movies={filteredMovies}
          title={
            debouncedQuery
              ? `Results for "${debouncedQuery}"${filteredMovies.length > 0 ? ` (${filteredMovies.length} found)` : ''}`
              : 'Search for movies'
          }
        />
      )}

      {!loading && debouncedQuery && filteredMovies.length === 0 && (
        <Alert variant="info" className="mt-3">
          No movies found for "{debouncedQuery}". Try a different search term.
        </Alert>
      )}
    </div>
  )
}

export default Search
