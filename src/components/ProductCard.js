import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

/* Motion variant */
const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function ProductCard({
  image,
  title,
  description,
  price,
  unit,
  rating,
  reviews,
  discount,
  mrp
}) {
  return (
    <motion.div
  className="product-card"
  variants={fadeUp}
  whileHover={{
    y: -8,
    scale: 1.02,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)"
  }}
  transition={{ type: "spring", stiffness: 260, damping: 20 }}
>

     <div className="product-image">
  <motion.img
    src={image}
    alt={title}
    whileHover={{ scale: 1.08 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  />
</div>


      <div className="product-info">
        <h3>{title}</h3>
        <p>{description}</p>

       {/* PRICE SECTION */}
<div className="product-price">
  {/* MRP + Discount (top) */}
  {mrp && (
    <div className="mrp-row">
      <span className="mrp-label">MRP</span>
      <span className="mrp-value">₹{mrp}</span>

      {discount && discount > 0 && (
        <span className="discount-badge">
          {discount}% OFF
        </span>
      )}
    </div>
  )}

  {/* Final Price (CENTER & BIG) */}
  <div className="price-row price-center">
    <span className="price-value">₹{price}</span>
  </div>
</div>



       <motion.button
  className="product-btn"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  View Details
</motion.button>


        <div className="product-rating">
          <FaStar className="star" />
          <span>{rating}</span>
          <p>{reviews}+ reviews</p>
        </div>
      </div>
    </motion.div>
  );
}
