import React, { useState } from 'react'

export function ProductCard ({
  uuid,
  tipo_producto_id,
  proveedor_id,
  codigoFarlab,
  index,
  nombre,
  descripcion,
  imagen,
  activo,
  onAddToCart
}) {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    setQuantity(isNaN(value) || value < 1 ? 1 : value)
  }

  const handleAddToCart = () => {
    onAddToCart(quantity)
    setQuantity(1)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="h-48" style={{ backgroundColor: '#0066ff' }}>
        <div className="flex h-full items-center justify-center text-white text-xl">
          {nombre}
        </div>
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
