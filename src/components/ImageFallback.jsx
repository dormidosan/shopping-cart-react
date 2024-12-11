import React, { useState } from 'react'
import '../styles/image.css'

const IMAGE_SRC = 'http://127.0.0.1:8000/storage/images/'

export function ImageFallback ({ src, alt, fallback = 'nd.png' }) {
  const [imgSrc, setImgSrc] = useState(src ? `${IMAGE_SRC}${src}` : '')

  // const fullImagen = imagen ? `${IMAGE_SRC}${imagen}` : ''

  const handleError = () => {
    setImgSrc(fallback) // Replace with the fallback image
  }

  return (
    <>

      <img className="skeleton" src={imgSrc} alt={alt} onError={handleError} loading="lazy" />

    </>
  )
}
