import React, { useState, useMemo, useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import { fetchProducts } from '../services/products'
import { filters } from '../mocks/filters.js'
import ListOfProducts from '../components/ListOfProducts.jsx'

const Catalog = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    categorias: [],
    proveedor: [],
    area: []
  })

  const [products, setProducts] = useState([]) // State to store fetched products
  // const [products, setProducts] = useState([]); // State to store fetched products
  // const [isLoading, setIsLoading] = useState(true) // State to manage loading state
  // const [error, setError] = useState(null) // State to manage error
  const displayedProducts = useRef([])

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const newProducts = await fetchProducts()
      setProducts(newProducts)
      // originalProducts.current = newProducts
    }
    fetchAndSetProducts()
  }, [])

  const handleFilterChange = (filterId, group) => {
    setSelectedFilters((prev) => {
      const updatedGroup = prev[group].includes(filterId)
        ? prev[group].filter((id) => id !== filterId) // Remove filterId if already selected
        : [...prev[group], filterId] // Add filterId if not selected

      return { ...prev, [group]: updatedGroup }
    })
  }

  console.log('rendering Catalog component')
  const filteredProducts = useMemo(() => {
    const newFiltered = products.filter((product) => {
      const matchCategoria =
        selectedFilters.categorias.length === 0 ||
        selectedFilters.categorias.includes(product.tipoProductoId)
      const matchProveedor =
        selectedFilters.proveedor.length === 0 ||
        selectedFilters.proveedor.includes(product.proveedorId)
      const matchArea =
        selectedFilters.area.length === 0 ||
        selectedFilters.area.includes(product.areaId)

      return matchCategoria && matchProveedor && matchArea
    })

    // TRUE if they are equal, FALSE if they are different
    const areEqual = JSON.stringify(newFiltered) === JSON.stringify(displayedProducts.current)
    console.log('areEqual', areEqual)
    if (!areEqual) {
      displayedProducts.current = newFiltered
    }
    return displayedProducts.current
    // return newFiltered
    // if (!areEqual) {
    //   originalProducts.current = newFiltered
    // }

    // return filteredProductsRef.current
  }, [products, selectedFilters])

  return (
    <main className="py-1 mt-16 bg-blue-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-500 mb-2">
          Catalogo de productos
        </h1>
        <p className="text-gray-600 text-lg">
          Encuentra los productos que necesitas
        </p>
      </div>

      <div className="absolute mt-28 top-0 right-0 p-4 text-lg text-blue-600">
        Cantidad: {filteredProducts?.length}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <Sidebar
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
        <div className="mr-4 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ListOfProducts filteredProducts={filteredProducts} />
        </div>
      </div>
    </main>
  )
}

export default Catalog
