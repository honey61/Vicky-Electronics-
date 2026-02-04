


import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import "../../Styles/PagesStyle/Products.css";

const DEFAULT_IMAGE =
  "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://vicky-ele-server-1.onrender.com/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.trim() === "") setSort("");
  }, [search]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      list = list.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "low-high") list.sort((a, b) => a.price - b.price);
    if (sort === "high-low") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, search, sort]);

  return (
    <div className="products-page">

      {/* HERO */}
     <motion.section
  className="products-hero"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    ease: "easeOut"
  }}
>
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
  >
    Our Products
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.35, duration: 0.6 }}
  >
    Quality electrical products with trusted brands, fair pricing,
    and reliable performance.
  </motion.p>
</motion.section>


      {/* CONTENT */}
      <section className="products-content">

        {/* FILTER BAR */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* STATES */}
        {loading && <p className="no-result">Loading products...</p>}

        {!loading && (
          <motion.div
            className="products-grid"
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const image =
                  product.images?.length > 0
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
              })
            ) : (
              <p className="no-result">No products found</p>
            )}
          </motion.div>
        )}
      </section>
    </div>
  );
}
