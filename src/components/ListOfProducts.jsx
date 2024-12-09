import React from 'react'
import { ProductCard } from './ProductCard'
import { useCart } from '../context/CartContext'

const ListOfProducts = React.memo(({ filteredProducts }) => {
  const { addToCart } = useCart()
  const handleAddToCart = (uuid, productName, quantity) => {
    addToCart({ uuid, nombre: productName, quantity })
  }
  console.log('rendering ListOfProducts component')

  return (
    <>
      {filteredProducts?.map((product, index) => (
        <ProductCard
          key={product.uuid}
          {...product}
          index={index + 1}
          onAddToCart={(quantity) =>
            handleAddToCart(product.uuid, product.nombre, quantity)}
        />
      ))}
    </>
  )
}, (prevProps, nextProps) => {
  // Only re-render if filteredProducts reference changes
  return prevProps.filteredProducts === nextProps.filteredProducts
})

export default ListOfProducts
