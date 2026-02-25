import React from 'react'
import { ClipLoader } from 'react-spinners'

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <ClipLoader color="#e50914" size={60} />
    </div>
  )
}

export default LoadingSpinner
