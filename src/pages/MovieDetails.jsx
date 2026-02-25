import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieDetails, IMAGE_BASE_URL } from '../api/tmdb'
import { useFetch } from '../hooks/useFetch'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import LoadingSpinner from '../components/LoadingSpinner'
import { Button, Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap'
import './MovieDetails.css'

const MovieDetails = () => {
  const { id } = useParams()
  const { data: movie, loading, error } = useFetch(
    () => fetchMovieDetails(id),
    [id]
  )
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const { showToast } = useToast()

  const handleFavoriteClick = () => {
    if (!movie) return
    const movieTitle = movie.title || 'Movie'
    if (isFavorite(movie.id)) {
      const success = removeFavorite(movie.id)
      if (success) showToast(`${movieTitle} removed from favorites`, 'info')
      else showToast('Error removing from favorites', 'danger')
    } else {
      const success = addFavorite(movie)
      if (success) showToast(`${movieTitle} added to favorites!`, 'success')
      else showToast(`${movieTitle} is already in favorites`, 'warning')
    }
  }

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Movie</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    )
  }

  if (!movie) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>Movie Not Found</Alert.Heading>
          <p>The movie you're looking for doesn't exist or has been removed.</p>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="movie-details">
      <Row>
        <Col md={4}>
          <Card.Img
            variant="top"
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
          />
        </Col>
        <Col md={8}>
          <h1>{movie.title}</h1>
          <div className="mb-3">
            {movie.genres?.map(genre => (
              <Badge key={genre.id} bg="secondary" className="me-2">{genre.name}</Badge>
            ))}
          </div>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
          <p>{movie.overview}</p>
          <Button
            variant={isFavorite(movie.id) ? 'danger' : 'primary'}
            onClick={handleFavoriteClick}
          >
            {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default MovieDetails
