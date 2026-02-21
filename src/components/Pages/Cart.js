import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import "../../Styles/PagesStyle/Cart.css";

const DEFAULT_IMAGE =
  "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png";

const WHATSAPP_NUMBER = "918126246330";

const loadCart = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem("cart") || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    setCartItems(loadCart());
  }, []);

  const syncCart = (nextCart) => {
    setCartItems(nextCart);
    localStorage.setItem("cart", JSON.stringify(nextCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (productId, delta) => {
    const next = cartItems
      .map((item) => {
        if (item.productId !== productId) return item;
        return { ...item, quantity: Math.max(1, Number(item.quantity || 1) + delta) };
      })
      .filter(Boolean);

    syncCart(next);
  };

  const removeItem = (productId) => {
    const next = cartItems.filter((item) => item.productId !== productId);
    syncCart(next);
  };

  const clearCart = () => {
    syncCart([]);
  };

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.quantity || 1), 0),
    [cartItems]
  );

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
        0
      ),
    [cartItems]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill name, phone and address.");
      return;
    }

    const productLines = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}\n   Qty: ${item.quantity}\n   Price: ₹${item.price}\n   Subtotal: ₹${
            Number(item.price || 0) * Number(item.quantity || 1)
          }`
      )
      .join("\n\n");

    const message = `Hello Vicky Electronics 👋

I would like to place an order from cart.

👤 Customer Name: ${customer.name}
📞 Phone: ${customer.phone}

📦 Products:
${productLines}

🧾 Total Items: ${totalItems}
💰 Total Amount: ₹${totalAmount}

📍 Delivery Address:
${customer.address}
City: ${customer.city}
State: ${customer.state}
Pincode: ${customer.pincode}

Please confirm availability and next steps.
Thank you!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    setShowOrderPopup(false);
  };

  return (
    <motion.div
      className="cart-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="cart-header">
        <h1>Your Cart</h1>
        {cartItems.length > 0 && (
          <button className="cart-clear-btn" onClick={clearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">Your cart is empty.</div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.productId}>
                <img src={item.image || DEFAULT_IMAGE} alt={item.name} />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  <div className="cart-qty">
                    <button onClick={() => updateQuantity(item.productId, -1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, 1)}>+</button>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <p>₹{Number(item.price || 0) * Number(item.quantity || 1)}</p>
                  <button onClick={() => removeItem(item.productId)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <p>Total Items: {totalItems}</p>
            <p>Total Amount: ₹{totalAmount}</p>
            <button className="cart-order-btn" onClick={() => setShowOrderPopup(true)}>
              Order on WhatsApp
            </button>
          </aside>
        </div>
      )}

      {showOrderPopup && (
        <div className="cart-order-popup-overlay">
          <motion.div
            className="cart-order-popup"
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

            <div className="cart-popup-actions">
              <button onClick={() => setShowOrderPopup(false)}>Cancel</button>
              <button className="cart-place-order" onClick={handlePlaceOrder}>
                Place Order on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
