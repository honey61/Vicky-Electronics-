
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import "../../Styles/PagesStyle/ProductDetail.css";

const DEFAULT_IMAGE =
  "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png";

const WHATSAPP_NUMBER = "918126246330"; // your WhatsApp number

const decodeHtmlEntities = (html = "") => {
  if (typeof window === "undefined") return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const fetchRelated = useCallback(async (type, productId) => {
    try {
      const res = await axios.get(
        "https://vicky-ele-server-1.onrender.com/api/products"
      );
      const filtered = res.data.filter(
        (p) => p.type === type && p._id !== productId
      );
      setRelated(filtered.slice(0, 8));
    } catch (err) {
      console.error("Failed to load related products", err);
    }
  }, []);

  const fetchProduct = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://vicky-ele-server-1.onrender.com/api/products/${id}`
      );
      setProduct(res.data);
      fetchRelated(res.data.type, res.data._id);
    } catch (err) {
      console.error("Failed to load product", err);
    } finally {
      setLoading(false);
    }
  }, [fetchRelated, id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
const handleAddToCart = () => {
  const cartItem = {
    productId: product._id,
    name: product.name,
    price: product.price,
    image: product.images?.[0] || DEFAULT_IMAGE,
    quantity,
  };

  let cart = [];
  try {
    const parsed = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = Array.isArray(parsed) ? parsed : [];
  } catch {
    cart = [];
  }

  const existingIndex = cart.findIndex((item) => item.productId === product._id);

  if (existingIndex >= 0) {
    cart[existingIndex].quantity =
      Number(cart[existingIndex].quantity || 1) + Number(quantity || 1);
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));

  alert("Added to cart 🛒");
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    const message = `
Hello Vicky Electronics 👋

I would like to place an order.

👤 Customer Name: ${customer.name}
📞 Phone: ${customer.phone}

📦 Product Details:
• Product Name: ${product.name}
• Model Number: ${product.modelName}
• Quantity: ${quantity}

📍 Delivery Address:
${customer.address},
City: ${customer.city}, State: ${customer.state}
Pincode: ${customer.pincode}

Please confirm availability and next steps.
Thank you!
`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    setShowOrderPopup(false);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!product) return <p>Product not found</p>;
  const rawDetailDescription =
    product.detailDescription || product.detaildescription || "";
  const detailDescriptionHtml = decodeHtmlEntities(
    String(rawDetailDescription).trim()
  );

  return (
    <motion.div
      className="product-detail-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* PRODUCT SECTION */}
      <div className="product-page">
        <div className="left-column">
          <img
            src={product.images?.[0] || DEFAULT_IMAGE}
            alt={product.name}
          />
        </div>

        <div className="middle-column">
          <h1>{product.name}</h1>
          <p className="model">Model: {product.modelName}</p>

          <p className="price">
            ₹{product.price}
            <span className="mrp">₹{product.mrp}</span>
            <span className="discount">{product.discount}% OFF</span>
          </p>

          <p className="desc">{product.description}</p>

          <ul className="meta">
            <li><strong>Capacity:</strong> {product.capacity || "N/A"}</li>
            <li><strong>Warranty:</strong> {product.warranty || "N/A"}</li>
            <li><strong>Type:</strong> {product.type || "N/A"}</li>
          </ul>

          {detailDescriptionHtml && (
            <section className="detail-description-section">
              <h2>Detailed Description</h2>
              <div
                className="detail-description-content"
                dangerouslySetInnerHTML={{ __html: detailDescriptionHtml }}
              />
            </section>
          )}

          <div className="quantity-row">
            <span>Quantity</span>
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

  <button
    className="order-now"
    onClick={() => setShowOrderPopup(true)}
  >
    Buy Now
  </button>
</div>
        </div>
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
                image={item.images?.[0] || DEFAULT_IMAGE}
              />
            ))}
          </div>
        </div>
      )}

      {/* ORDER POPUP */}
      {showOrderPopup && (
        <div className="order-popup-overlay">
          <motion.div
            className="order-popup"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2>Delivery Details</h2>

            <input name="name" placeholder="Full Name" onChange={handleInputChange} />
            <input name="phone" placeholder="Phone Number" onChange={handleInputChange} />
            <textarea name="address" placeholder="Full Address" onChange={handleInputChange} />

            <div className="row">
              <input name="city" placeholder="City" onChange={handleInputChange} />
              <input name="state" placeholder="State" onChange={handleInputChange} />
            </div>

            <input name="pincode" placeholder="Pincode" onChange={handleInputChange} />

            <div className="popup-actions">
              <button onClick={() => setShowOrderPopup(false)}>Cancel</button>
              <button className="place-order" onClick={handlePlaceOrder}>
                Place Order on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
