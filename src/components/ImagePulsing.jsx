import React, { useState, useRef, useEffect } from 'react'

export function ImagePulsing ({ src: fullImagen, defaultImage, alt = 'Product or service' }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imageRef = useRef(null)
  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setIsLoaded(true)
    }
  }, [])
  const handleImageLoad = () => {
    console.log('Image loaded is changed to true')
    setIsLoaded(true)
  }
  return (
    <div className="h-48 pulse-loader relative ">
      {/* <AsyncImage src={fullImagen} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
      {/* <ImageFallback src={imagen} alt="imagen of the product or equipment" /> */}
      {/* imgLoaded ? null : <div className="h-48 pulse-loader"> </div> */}

      <img
        src={fullImagen}
        alt={alt} loading="lazy"
        onLoad={handleImageLoad}
        onError={(e) => (e.target.src = defaultImage)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          opacity: isLoaded ? 1 : 0
        }}
      />

      {/* <ImageWithBackground
          fullImage={fullImagen}
           style={imgLoaded ? {} : { opacity: 0.01 }}
          alt="Image of the product or equipment"
        /> */}
    </div>
  )
}
