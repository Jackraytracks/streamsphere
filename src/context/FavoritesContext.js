import { createContext, useContext, useState, useEffect } from 'react'

export const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites')
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites))
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error)
    }
  }, [])

  const addFavorite = (movie) => {
    try {
      if (favorites.some(fav => fav.id === movie.id)) return false
      const newFavorites = [...favorites, movie]
      setFavorites(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return true
    } catch (error) {
      console.error('Error adding favorite:', error)
      return false
    }
  }

  const removeFavorite = (movieId) => {
    try {
      const newFavorites = favorites.filter(movie => movie.id !== movieId)
      setFavorites(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return true
    } catch (error) {
      console.error('Error removing favorite:', error)
      return false
    }
  }

  const isFavorite = (movieId) => favorites.some(movie => movie.id === movieId)

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider')
  return context
}
