
import "../Styles/Navbar.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const readCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = Array.isArray(cart)
        ? cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0)
        : 0;
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  const handleNav = (path) => {
    navigate(path);
    setOpen(false);
  };

  /* SCROLL GLASS EFFECT */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    readCartCount();
    window.addEventListener("cartUpdated", readCartCount);
    window.addEventListener("storage", readCartCount);

    return () => {
      window.removeEventListener("cartUpdated", readCartCount);
      window.removeEventListener("storage", readCartCount);
    };
  }, []);

  return (
    <>
      {/* ================= TOP NAV ================= */}
      <div className={`top-nav ${scrolled ? "scrolled" : ""}`}>
        {/* LOGO */}
        <div className="logo" onClick={() => navigate("/Vicky-Electronics-")}>
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            VE
          </motion.span>

          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <small>Vicky Electronics</small>
            <small>India / Uttarakhand</small>
          </motion.div>
        </div>

        {/* DESKTOP MENU */}
        <ul className="desktop-menu">
     <li onClick={() => handleNav("/product")}>Product</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/electricians")}>Electricians</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
          <li onClick={() => handleNav("/cart")} className="cart-nav-item">
            Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </li>
        </ul>

        {/* HAMBURGER */}
        {/* HAMBURGER / CLOSE ICON */}
<div className="hamburger" onClick={() => setOpen(!open)}>
  {open ? (
    <FaTimes size={20} />
  ) : (
    <>
      <span />
      <span />
      <span />
    </>
  )}
</div>
      </div>

      {/* ================= MOBILE MENU ================= */}
    <AnimatePresence>
  {open && (
    <motion.div
      className="mobile-menu"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <ul>
        <li onClick={() => handleNav("/product")}>Product</li>
        <li onClick={() => handleNav("/about")}>About</li>
        <li onClick={() => handleNav("/electricians")}>Electricians</li>
        <li onClick={() => handleNav("/contact")}>Contact</li>
        <li onClick={() => handleNav("/cart")}>
          Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </li>
      </ul>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}

export default Navbar;
