import React, { useState } from 'react'

export function ImageWithBackground ({ fullImage, alt }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  const handleImageError = () => {
    console.error('Failed to load image')
    setIsImageLoaded(false)
  }

  return (
    <div
      style={{
        width: '300px', // Set width as needed
        height: '200px', // Set height as needed
        backgroundColor: isImageLoaded ? 'transparent' : 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <img
        src={fullImage}
        alt={alt}
        style={{
          display: isImageLoaded ? 'block' : 'none',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {!isImageLoaded && <span>Loading...</span>}
    </div>
  )
}
