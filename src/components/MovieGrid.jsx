import React from 'react'
import MovieCard from './MovieCard'

const MovieGrid = ({ movies, title, isLarge = false, onRemoveFavorite = null, isFavoritePage = false }) => {
  if (!movies || movies.length === 0) return null

  return (
    <div style={{ marginBottom: '2rem' }}>
      {title && (
        <h4 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: 'bold' }}>
          {title}
        </h4>
      )}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px' }}>
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isLarge={isLarge}
            onRemoveFavorite={isFavoritePage ? onRemoveFavorite : null}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieGrid
