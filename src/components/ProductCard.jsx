import React, { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { ImageFallback } from '../components/ImageFallback'
import '../styles/image.css'

import { ImageWithBackground } from './ImageWithBackground'
const IMAGE_SRC = 'http://127.0.0.1:8000/storage/images/'

export function ProductCard ({ index, ...props }) {
  const {
    uuid, tipo_producto_id, proveedor_id,
    codigoFarlab, nombre, descripcion,
    imagen, activo
  } = props

  const [quantity, setQuantity] = useState(1)
  // const [imgLoaded, setImgLoaded] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const imageRef = useRef(null)
  const fullImagen = imagen ? `${IMAGE_SRC}${imagen}` : 'nd.png'

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    setQuantity(isNaN(value) || value < 1 ? 1 : value)
  }

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setIsLoaded(true)
    }
  }, [])

  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({ uuid, nombre, quantity })
    console.log('Product added to cart')
    setQuantity(1)
  }

  const handleImageLoad = () => {
    console.log('Image loaded is changed to true')
    setIsLoaded(true)
  }

  // console.log('rendering ProductCard component' + nombre)
  // const onLoadImage = () => {
  //   console.log('Loading img ' + imagen)
  //   setImgLoaded(true)
  // }

  // console.log('rendering ProductCard component' + nombre)

  return (

    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">

      <div className="h-48 pulse-loader relative ">
        {/* <AsyncImage src={fullImagen} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
        {/* <ImageFallback src={imagen} alt="imagen of the product or equipment" /> */}
        {/* imgLoaded ? null : <div className="h-48 pulse-loader"> </div> */}
        <img
          src={fullImagen}
          alt="imagen of the product or equipment" loading="lazy"
          onLoad={(e) => (e.target.style.opacity = 1)}
          // onLoad={handleImageLoad}
          onError={(e) => (e.target.src = IMAGE_SRC + 'nd.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            // transition: 'opacity 0.1s ease-in-out',
            opacity: 0.03
          }}
        />

        {/* <ImageWithBackground
          fullImage={fullImagen}
           style={imgLoaded ? {} : { opacity: 0.01 }}
          alt="Image of the product or equipment"
        /> */}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{nombre}</h3>
        <p className="text-sm text-gray-500 mt-1">{codigoFarlab}</p>
        <div className="flex items-center space-x-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < 3 ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-2xl text-blue-500">{index}</span>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 px-2 py-1 border rounded"
          />
          <button
            onClick={handleAddToCart}
            className="flex-grow bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

  )
}
