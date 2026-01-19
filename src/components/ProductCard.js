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
  reviews
}) {
  return (
    <motion.div className="product-card" variants={fadeUp}>
      <div className="product-image">
        <img src={image} alt={title} />
      </div>

      <div className="product-info">
        <h3>{title}</h3>
        <p>{description}</p>

        <div className="product-price">
          <strong>₹{price}</strong>
          <span>/{unit}</span>
        </div>

        <button className="product-btn">View Details</button>

        <div className="product-rating">
          <FaStar className="star" />
          <span>{rating}</span>
          <p>{reviews}+ reviews</p>
        </div>
      </div>
    </motion.div>
  );
}
