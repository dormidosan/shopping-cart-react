import React from 'react'
import { ProductCard } from './ProductCard'

const ListOfProducts = React.memo(({ filteredProducts }) => {
  console.log('rendering ListOfProducts component')
  // const [firstRender, setFirstRender] = React.useState(false)

  return (
    <>
      {filteredProducts?.map((product, index) => (
        <ProductCard
          key={product.uuid}
          {...product}
          index={index + 1}
        />
      ))}
    </>
  )
})

export default ListOfProducts
