
import "../Styles/PopularProducts.css";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

/* Motion variants */
const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

export default function PopularProducts() {
  const products = [
    {
      title: "Water Geyser",
      description: "Energy-efficient instant water geyser for home use.",
      price: "8,999",
      unit: "unit",
      rating: "4.8",
      reviews: "1200",
      image:
        "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155"
    },
    {
      title: "Electrical Wires",
      description: "High-quality copper wires for residential & industrial use.",
      price: "1,499",
      unit: "coil",
      rating: "4.7",
      reviews: "900",
      image:
        "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155"
    },
    {
      title: "LED Bulbs",
      description: "Long-lasting LED bulbs with low power consumption.",
      price: "299",
      unit: "piece",
      rating: "4.9",
      reviews: "3000",
      image:
        "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155"
    },
    {
      title: "Modular Switches",
      description: "Premium modular switches with modern design.",
      price: "199",
      unit: "piece",
      rating: "4.6",
      reviews: "1500",
      image:
        "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155"
    }
  ];

  return (
    <section className="products-section">
      {/* HEADER */}
      <motion.div
        className="products-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2>Popular Products</h2>
      </motion.div>

      {/* GRID */}
      <motion.div
        className="products-grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </motion.div>
    </section>
  );
}
