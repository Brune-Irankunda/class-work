
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
  const { status, data, error } = useProducts({
    limit: 12,
    skip: 0,
  });

  if (status === "loading") {
    return <p className="message">Loading products...</p>;
  }

  if (status === "error") {
    return <p className="message error">{error}</p>;
  }

  return (
    <main className="products-page">
      <header className="page-header">
        <h1>Product Explorer</h1>
        <p>Explore our latest products.</p>
      </header>

      <div className="products-grid">
        {data.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}

export default ProductsPage;
