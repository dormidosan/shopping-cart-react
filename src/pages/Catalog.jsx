import React from "react";
import { useState, useMemo, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { products } from "../mocks/api.json";

const filters = [
  {
    title: "Categorias",
    options: [
      { id: 1, label: "Equipos" },
      { id: 2, label: "Reactivos" },
      { id: 3, label: "Medicamentos" },
      { id: 4, label: "Pruebas Rapidas" },
      { id: 5, label: "Miscelaneos" },
    ],
  },
  {
    title: "Proveedor",
    options: [
      { id: 1, label: "Spinreact" },
      { id: 2, label: "Mindray" },
      { id: 3, label: "RightSign" },
    ],
  },
  {
    title: "Area",
    options: [
      { id: 1, label: "Quimica" },
      { id: 2, label: "Hematologia" },
      { id: 3, label: "Coagulacion" },
      { id: 4, label: "Urianalisis" },
    ],
  },
];

const Listproducts = [
  {
    name: "usi",
    manufacturer: "Sadie Macejkovic",
    rating: 4,
    backgroundColor: "#00ff9d",
    category: "equipos",
  },
  {
    name: "iusto",
    manufacturer: "Harrison Rempel",
    rating: 2,
    backgroundColor: "#0066ff",
    category: "reactivos",
  },
  {
    name: "laborum",
    manufacturer: "Magnus Zboncak",
    rating: 5,
    backgroundColor: "#0000cc",
    category: "miscelaneos",
  },
  {
    name: "asd",
    manufacturer: "Sadie Macejkovic",
    rating: 3,
    backgroundColor: "#31119d",
    category: "reactivos",
  },
  {
    name: "iusto",
    manufacturer: "Harrison Rempel",
    rating: 3,
    backgroundColor: "#5277ff",
    category: "equipos",
  },
  {
    name: "laborum",
    manufacturer: "Magnus Zboncak",
    rating: 3,
    backgroundColor: "#93FF55",
    category: "pruebasrapidas",
  },
];

const Catalog = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    categorias: [],
    proveedor: [],
    area: [],
  });

  const { addToCart } = useCart();

  //const [products, setProducts] = useState([]); // State to store fetched products
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error

  // Fetch products from the API
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://127.0.0.1:8000/api/productos/listado"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch products");
  //       }
  //       const data = await response.json(); // Parse JSON response
  //       setProducts(data); // Set the fetched products in state
  //     } catch (err) {
  //       setError(err.message); // Handle errors
  //     } finally {
  //       setIsLoading(false); // End loading state
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  const handleFilterChange = (filterId, group) => {
    setSelectedFilters((prev) => {
      const updatedGroup = prev[group].includes(filterId)
        ? prev[group].filter((id) => id !== filterId)
        : [...prev[group], filterId];

      return {
        ...prev,
        [group]: updatedGroup,
      };
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategoria =
        selectedFilters.categorias.length === 0 ||
        selectedFilters.categorias.includes(product.tipo_producto_id);
      const matchProveedor =
        selectedFilters.proveedor.length === 0 ||
        selectedFilters.proveedor.includes(product.proveedor_id); // Assuming this is the correct field
      const matchArea =
        selectedFilters.area.length === 0 ||
        selectedFilters.area.includes(product.area_id); // Assuming this is the correct field

      return matchCategoria && matchProveedor && matchArea;
    });
  }, [selectedFilters, products]);

  const handleAddToCart = (uuid, productName, quantity) => {
    addToCart({ uuid, nombre: productName, quantity });
  };

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
        Cantidad: {filteredProducts.length}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <Sidebar
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
        <div className="mr-4 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.uuid}
              {...product}
              index={index + 1}
              onAddToCart={(quantity) =>
                handleAddToCart(product.uuid, product.nombre, quantity)
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Catalog;
