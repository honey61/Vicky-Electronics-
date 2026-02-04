import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  id,             
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
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${id}`);
  };

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
      {/* IMAGE */}
      <div className="product-image">
        <motion.img
          src={image}
          alt={title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* INFO */}
      <div className="product-info">
        <h3>{title}</h3>
        <p>{description}</p>

        {/* PRICE SECTION */}
        <div className="product-price">
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

          <div className="price-row price-center">
            <span className="price-value">₹{price}</span>
          </div>
        </div>

        {/* VIEW DETAILS BUTTON */}
        <motion.button
          className="product-btn"
          onClick={handleViewDetails}  
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details
        </motion.button>

        {/* RATING */}
        <div className="product-rating">
          <FaStar className="star" />
          <span>{rating}</span>
          <p>{reviews}+ reviews</p>
        </div>
      </div>
    </motion.div>
  );
}
