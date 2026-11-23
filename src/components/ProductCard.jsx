
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">

      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">
          {product.title}
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          {product.category}
        </p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-blue-600">
            ${product.price}
          </p>

          <span className="text-sm text-yellow-600">
            ⭐ {product.rating}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {product.stock} items in stock
        </p>
      </div>

    </div>
  );
}

export default ProductCard;
