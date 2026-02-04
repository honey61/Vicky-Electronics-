
import "../Styles/PopularProducts.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

/* Default image fallback */
const DEFAULT_IMAGE =
  "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155";

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  const fetchPopularProducts = async () => {
    try {
      const res = await axios.get("https://vicky-ele-server-1.onrender.com/api/products");

      const popularProducts = res.data.filter(
        (p) => p.type?.toLowerCase() === "popular"
      );

      setProducts(popularProducts);
    } catch (err) {
      console.error("❌ Failed to fetch popular products", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading popular products...</p>;
  }

  if (products.length === 0) return null;

  return (
    <section className="products-section">
      <motion.div
        className="products-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2>Popular Products</h2>
      </motion.div>

      <motion.div
        className="products-grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {products.map((product) => {
          const image =
            product.images && product.images.length > 0
              ? product.images[0]
              : DEFAULT_IMAGE;

          return (
            <ProductCard
  key={product._id}
  title={product.name}
  description={product.description}
  price={product.price}
  mrp={product.mrp}
  discount={product.discount}
  unit="unit"
  rating={product.rating || "4.5"}
  reviews={product.reviews || "0"}
  image={image}
/>

          );
        })}
      </motion.div>
    </section>
  );
}
