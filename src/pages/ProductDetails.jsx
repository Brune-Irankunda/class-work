
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProduct } from "../api/product";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchProduct(id, {
          signal: controller.signal,
        });

        setProduct(data);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;

        setError(err.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading product details...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="p-6">Product not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link to="/" className="text-blue-600">
        ← Back to Products
      </Link>

      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full max-w-md h-64 object-cover rounded-lg"
        />

        <h1 className="text-3xl font-bold mt-5">
          {product.title}
        </h1>

        <p className="text-gray-600 mt-3">
          {product.description}
        </p>

        <p className="text-2xl font-bold text-blue-600 mt-4">
          ${product.price}
        </p>

        <p className="mt-2">
          Category: {product.category}
        </p>

        <p className="mt-2">
          Rating: ⭐ {product.rating}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
