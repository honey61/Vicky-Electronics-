import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import "../../Styles/PagesStyle/Products.css";

const DEFAULT_IMAGE =
  "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155";

const PRODUCTS_PER_PAGE = 16;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://vicky-ele-server-1.onrender.com/api/products"
      );
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  /* Reset page when search or sort changes */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort]);

  /* ================= FILTER + SORT ================= */
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

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  return (
    <div className="products-page">
      {/* ================= HERO ================= */}
      <motion.section
        className="products-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
          Quality electrical products with trusted brands, fair pricing, and
          reliable performance.
        </motion.p>
      </motion.section>

      {/* ================= CONTENT ================= */}
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
          <>
            <motion.div
              className="products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => {
                  const image =
                    product.images?.length > 0
                      ? product.images[0]
                      : DEFAULT_IMAGE;

                  return (
                    <ProductCard
                      key={product._id}
                      id={product._id}
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

            {/* ================= PAGINATION UI ================= */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={currentPage === i + 1 ? "active" : ""}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
