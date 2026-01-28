
// import "../Styles/PopularProducts.css";
// import { motion } from "framer-motion";
// import ProductCard from "./ProductCard";

// /* Motion variants */
// const fadeUp = {
//   hidden: { y: 30, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { duration: 0.5, ease: "easeOut" }
//   }
// };

// const stagger = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.15 }
//   }
// };

// export default function PopularProducts() {
//   const products = [
//     {
//       title: "Water Geyser",
//       description: "Energy-efficient instant water geyser for home use.",
//       price: "8,999",
//       unit: "unit",
//       rating: "4.8",
//       reviews: "1200",
//       image:
//         "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155"
//     },
//     {
//       title: "Electrical Wires",
//       description: "High-quality copper wires for residential & industrial use.",
//       price: "1,499",
//       unit: "coil",
//       rating: "4.7",
//       reviews: "900",
//       image:
//         "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155"
//     },
//     {
//       title: "LED Bulbs",
//       description: "Long-lasting LED bulbs with low power consumption.",
//       price: "299",
//       unit: "piece",
//       rating: "4.9",
//       reviews: "3000",
//       image:
//         "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155"
//     },
//     {
//       title: "Modular Switches",
//       description: "Premium modular switches with modern design.",
//       price: "199",
//       unit: "piece",
//       rating: "4.6",
//       reviews: "1500",
//       image:
//         "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155"
//     }
//   ];

//   return (
//     <section className="products-section">
//       {/* HEADER */}
//       <motion.div
//         className="products-header"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeUp}
//       >
//         <h2>Popular Products</h2>
//       </motion.div>

//       {/* GRID */}
//       <motion.div
//         className="products-grid"
//         variants={stagger}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//       >
//         {products.map((product, index) => (
//           <ProductCard key={index} {...product} />
//         ))}
//       </motion.div>
//     </section>
//   );
// }
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
      const res = await axios.get("http://localhost:8080/api/products");

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
