
// import { useState, useMemo, useEffect } from "react";
// import { motion } from "framer-motion";
//  import ProductCard from "../../components/ProductCard";
// import "../../Styles/PagesStyle/Products.css";

// /* DUMMY PRODUCT DATA (can be replaced with API later) */
// const productsData = [
//   {
//     id: 1,
//     title: "LED Bulb 12W",
//     description: "Energy efficient bright LED bulb",
//     price: 120,
//     unit: "piece",
//     rating: 4.5,
//     reviews: 230,
//     image: "/products/bulb.jpg"
//   },
//   {
//     id: 2,
//     title: "Electrical Wire 90m",
//     description: "High quality copper wire",
//     price: 2100,
//     unit: "roll",
//     rating: 4.2,
//     reviews: 180,
//     image: "/products/wire.jpg"
//   },
//   {
//     id: 3,
//     title: "Modular Switch Board",
//     description: "Premium modular switch board",
//     price: 450,
//     unit: "unit",
//     rating: 4.7,
//     reviews: 310,
//     image: "/products/switch.jpg"
//   },
//   {
//     id: 4,
//     title: "MCB Switch",
//     description: "Electrical safety MCB switch",
//     price: 850,
//     unit: "piece",
//     rating: 4.4,
//     reviews: 145,
//     image: "/products/mcb.jpg"
//   }
// ];

// export default function Products() {
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");

//   /* RESET SORT WHEN SEARCH CLEARS (optional but recommended) */
//   useEffect(() => {
//     if (search.trim() === "") {
//       setSort("");
//     }
//   }, [search]);

//   /* FILTER + SORT (IMMUTABLE & BUG-FREE) */
//   const filteredProducts = useMemo(() => {
//     let list = [...productsData]; // 🔥 DO NOT MUTATE ORIGINAL

//     if (search.trim() !== "") {
//       list = list.filter((p) =>
//         p.title.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (sort === "low-high") {
//       list = [...list].sort((a, b) => a.price - b.price);
//     }

//     if (sort === "high-low") {
//       list = [...list].sort((a, b) => b.price - a.price);
//     }

//     return list;
//   }, [search, sort]);

//   return (
//     <section className="products-page">
//       {/* TITLE */}
//       <motion.h1
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         Our Products
//       </motion.h1>

//       {/* SEARCH + SORT */}
//       <div className="filter-bar">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select value={sort} onChange={(e) => setSort(e.target.value)}>
//           <option value="">Sort by</option>
//           <option value="low-high">Price: Low to High</option>
//           <option value="high-low">Price: High to Low</option>
//         </select>
//       </div>

//       {/* PRODUCTS GRID */}
//       <motion.div
//         className="products-grid"
//         initial="hidden"
//         animate="visible"
//       >
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <ProductCard key={product.id} {...product} />
//           ))
//         ) : (
//           <p className="no-result">No products found</p>
//         )}
//       </motion.div>
//     </section>
//   );
// }
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import "../../Styles/PagesStyle/Products.css";

/* Default image fallback */
const DEFAULT_IMAGE =
  "https://www.crompton.co.in/cdn/shop/files/Storage_Water_Heater_07057b7d-8839-409e-87dd-336b1e7ef16c_600x.png?v=1694501155";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  /* 🔹 Fetch ALL products from backend */
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 Reset sort when search clears */
  useEffect(() => {
    if (search.trim() === "") {
      setSort("");
    }
  }, [search]);

  /* 🔍 FILTER + SORT (IMMUTABLE) */
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search.trim() !== "") {
      list = list.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "low-high") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, search, sort]);

  return (
    <section className="products-page">
      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Our Products
      </motion.h1>

      {/* SEARCH + SORT */}
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

      {/* LOADING STATE */}
      {loading && <p className="no-result">Loading products...</p>}

      {/* PRODUCTS GRID */}
      {!loading && (
        <motion.div
          className="products-grid"
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
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
            })
          ) : (
            <p className="no-result">No products found</p>
          )}
        </motion.div>
      )}
    </section>
  );
}
