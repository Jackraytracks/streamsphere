import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { IMAGE_BASE_URL } from '../api/tmdb'
import { Card, Badge } from 'react-bootstrap'
import { BsHeartFill, BsHeart } from 'react-icons/bs'

const MovieCard = ({ movie, isLarge = false, onRemoveFavorite = null }) => {
  const navigate = useNavigate()
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const { showToast } = useToast()

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    const title = movie.title || 'Movie'
    if (onRemoveFavorite) {
      onRemoveFavorite(movie.id)
      showToast(`${title} removed from favorites`, 'info')
      return
    }
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id)
      showToast(`${title} removed from favorites`, 'info')
    } else {
      const success = addFavorite(movie)
      if (success) showToast(`${title} added to favorites!`, 'success')
      else showToast(`${title} is already in favorites`, 'warning')
    }
  }

  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image'

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)}
      style={{
        cursor: 'pointer',
        width: isLarge ? '200px' : '150px',
        minWidth: isLarge ? '200px' : '150px',
        backgroundColor: 'transparent',
        border: 'none',
        transition: 'transform 0.2s ease',
        position: 'relative'
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={movie.title}
        style={{ borderRadius: '4px', height: isLarge ? '300px' : '225px', objectFit: 'cover' }}
      />
      <div
        onClick={handleFavoriteClick}
        style={{
          position: 'absolute', top: '8px', right: '8px',
          background: 'rgba(0,0,0,0.6)', borderRadius: '50%',
          width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 2
        }}
      >
        {isFavorite(movie.id) || onRemoveFavorite
          ? <BsHeartFill color="#e50914" size={16} />
          : <BsHeart color="#fff" size={16} />
        }
      </div>
      <Card.Body style={{ padding: '8px 4px' }}>
        <Card.Title style={{ fontSize: '0.8rem', color: 'var(--text-color)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {movie.title}
        </Card.Title>
        {movie.vote_average > 0 && (
          <Badge bg="warning" text="dark" style={{ fontSize: '0.7rem' }}>
            ⭐ {movie.vote_average?.toFixed(1)}
          </Badge>
        )}
      </Card.Body>
    </Card>
  )
}

export default MovieCard
