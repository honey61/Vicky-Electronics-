import "../Styles/WhyChooseUs.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* Animation Variants */
const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const fadeLeft = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const fadeRight = {
  hidden: { x: 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

function WhyChooseUs() {
    const navigate = useNavigate();
  return (
    <section className="why-section">
      <div className="why-container">

        {/* HEADER */}
        <motion.span
          className="why-tag"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          WHY CHOOSE US
        </motion.span>

        <motion.h2
          className="why-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Why <span>Vicky Electronics</span> is the Right Choice for You
        </motion.h2>

        {/* CONTENT */}
        <div className="why-grid">

          {/* LEFT CARDS */}
          <motion.div
            className="why-left"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="why-card" variants={fadeLeft}>
              <div className="icon">⚡</div>
              <h3>Quality Assured Products</h3>
              <p>
                We provide high-quality electrical and electronic products
                sourced from trusted brands and manufacturers.
              </p>
            </motion.div>

            <motion.div className="why-card" variants={fadeLeft}>
              <div className="icon">🛠️</div>
              <h3>Expert Technical Support</h3>
              <p>
                Our experienced team helps you choose the right products
                with complete technical guidance.
              </p>
            </motion.div>

            <motion.div className="why-card wide" variants={fadeLeft}>
              <div className="icon">📦</div>
              <h3>Wide Product Range</h3>
              <p>
                From geysers, wires, LED lights to switches and accessories —
                everything under one roof at competitive prices.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT HIGHLIGHT CARD */}
          <motion.div
            className="why-right"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>Flexible Buying & Reliable Service</h3>
            <p>
              We understand your needs. Whether you are a retailer,
              contractor, or homeowner, we offer flexible purchasing
              options, timely delivery, and reliable after-sales support.
            </p>

            <button className="why-btn" onClick={() => navigate("/contact")}>
              Contact Us →
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
