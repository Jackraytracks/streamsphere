import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IMAGE_BASE_URL } from '../api/tmdb'
import { Button } from 'react-bootstrap'

const Banner = ({ movie }) => {
  const navigate = useNavigate()

  if (!movie) return null

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)),
          url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '2rem 3rem',
        color: '#fff'
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', maxWidth: '600px' }}>
        {movie.title}
      </h1>
      <p style={{ maxWidth: '500px', marginTop: '1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.8)', WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {movie.overview}
      </p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', paddingBottom: '2rem' }}>
        <Button variant="light" size="lg" onClick={() => navigate(`/movie/${movie.id}`)}>
          ▶ More Info
        </Button>
      </div>
    </div>
  )
}

export default Banner
