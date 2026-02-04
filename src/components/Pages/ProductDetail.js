import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import "../../Styles/PagesStyle/ProductDetail.css";

const DEFAULT_IMAGE =
  "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png";

export default function ProductDetail() {
   console.log("✅ ProductDetail page rendered");

  const { id } = useParams();
  console.log("Product ID from URL:", id);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://vicky-ele-server-1.onrender.com/api/products/${id}`
      );

      setProduct(res.data);
      fetchRelated(res.data.type, res.data._id);
    } catch (err) {
      console.error("❌ Failed to load product", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async (type, productId) => {
    try {
      const res = await axios.get(
        `https://vicky-ele-server-1.onrender.com/api/products`
      );

      const filtered = res.data.filter(
        (p) => p.type === type && p._id !== productId
      );

      setRelated(filtered.slice(0, 10));
    } catch (err) {
      console.error("❌ Failed to load related products", err);
    }
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () =>
    setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    console.log("🛒 Add to cart", product._id, quantity);
  };

  const handleOrderNow = () => {
    console.log("⚡ Order now", product._id, quantity);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <motion.div
      className="product-detail-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* AMAZON STYLE LAYOUT */}
      <div className="product-page">
        {/* LEFT – IMAGE */}
        <motion.div
          className="left-column"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src={
              product.images?.length > 0
                ? product.images[0]
                : DEFAULT_IMAGE
            }
            alt={product.name}
          />
        </motion.div>

        {/* MIDDLE – INFO */}
        <motion.div
          className="middle-column"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1>{product.name}</h1>
          <p className="model">Model: {product.modelName}</p>

          <p className="price">
            ₹{product.price}
            <span className="mrp">₹{product.mrp}</span>
            <span className="discount">{product.discount}% OFF</span>
          </p>

          <p className="desc">{product.description}</p>

          <ul className="meta">
            <li><strong>Capacity:</strong> {product.capacity}</li>
            <li><strong>Warranty:</strong> {product.warranty} Months</li>
            <li><strong>Type:</strong> {product.type}</li>
          </ul>

          <motion.div
          className="right-column"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="quantity-row">
            <span className="qty-label">Quantity</span>
            <div className="quantity">
              <button onClick={decreaseQty}>−</button>
              <span>{quantity}</span>
              <button onClick={increaseQty}>+</button>
            </div>
          </div>

          <div className="buttons">
            <button className="add-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button className="order-now" onClick={handleOrderNow}>
              Buy Now
            </button>
          </div>
        </motion.div>
        </motion.div>

        {/* RIGHT – BUY BOX */}
        
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <div className="related-section">
          <h2>Similar Products</h2>

          <div className="related-grid">
            {related.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                title={item.name}
                price={item.price}
                image={
                  item.images?.length > 0
                    ? item.images[0]
                    : DEFAULT_IMAGE
                }
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
