
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="product-link"
    >
      <div className="product-card">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />

        <div className="product-info">
          <h2>{product.title}</h2>

          <p className="category">
            {product.category}
          </p>

          <div className="product-bottom">
            <span className="price">
              ${product.price}
            </span>

            <span className="rating">
               {product.rating}
            </span>
          </div>

          <p className="stock">
            {product.stock} items in stock
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
