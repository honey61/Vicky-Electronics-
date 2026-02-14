import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import "../../Styles/PagesStyle/Products.css";

const DEFAULT_IMAGE =
  "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155";

const PRODUCTS_PER_PAGE = 16;

const rankPriority = {
  "Most Recommended": 1,
  "Recommended": 2,
  "Average": 3,
  "Less Recommended": 4,
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
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

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://vicky-ele-server-1.onrender.com/api/categories"
      );
      setCategories(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch categories", err);
    }
  };

  /* ================= FETCH BY CATEGORY ================= */

  useEffect(() => {
    if (selectedCategory === "all") {
      fetchAllProducts();
      return;
    }

    const fetchByCategory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://vicky-ele-server-1.onrender.com/api/products/category/${selectedCategory}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch category products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchByCategory();
  }, [selectedCategory]);

  /* Reset page when filters change */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort, selectedCategory]);

  /* ================= SEARCH + AUTO RANK ================= */

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      list = list.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Rank sorting
    list.sort((a, b) => {
      const rankA = rankPriority[a.rank] ?? 999;
      const rankB = rankPriority[b.rank] ?? 999;
      return rankA - rankB;
    });

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
      <motion.section
        className="products-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Our Products</h1>
        <p>
          Quality electrical products with trusted brands, fair pricing, and
          reliable performance.
        </p>
      </motion.section>

      <section className="products-content">
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {loading && <p className="no-result">Loading products...</p>}

        {!loading && (
          <>
            <motion.div className="products-grid">
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
                      image={image}
                    />
                  );
                })
              ) : (
                <p className="no-result">No products found</p>
              )}
            </motion.div>

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
