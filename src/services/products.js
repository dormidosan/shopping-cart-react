import { products } from '../mocks/api.json'

export const fetchProducts = async () => {
  const mappedProducts = products.map((product) => ({
    uuid: product.uuid,
    tipoProductoId: product.tipo_producto_id,
    proveedorId: product.proveedor_id,
    codigoFarlab: product.codigo_farlab,
    nombre: product.nombre,
    descripcion: product.descripcion,
    imagen: product.imagen,
    activo: product.activo
  }))

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
  return mappedProducts
}
