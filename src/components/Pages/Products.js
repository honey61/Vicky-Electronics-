// import { useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import ProductCard from "../../components/ProductCard";
// import "../../Styles/PagesStyle/Products.css";

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
//     title: "Switch Board",
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
//     description: "Safety MCB switch",
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

//   /* SEARCH + SORT LOGIC */
//   const filteredProducts = useMemo(() => {
//     let list = productsData.filter(p =>
//       p.title.toLowerCase().includes(search.toLowerCase())
//     );

//     if (sort === "low-high") {
//       list.sort((a, b) => a.price - b.price);
//     }

//     if (sort === "high-low") {
//       list.sort((a, b) => b.price - a.price);
//     }

//     return list;
//   }, [search, sort]);

//   return (
//     <section className="products-page">

//       {/* HEADER */}
//       <motion.h1
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         Our Products
//       </motion.h1>

//       {/* FILTER BAR */}
//       <div className="filter-bar">
//         <input
//           type="text"
//           placeholder="Search for products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select value={sort} onChange={(e) => setSort(e.target.value)}>
//           <option value="">Sort by</option>
//           <option value="low-high">Price: Low to High</option>
//           <option value="high-low">Price: High to Low</option>
//         </select>
//       </div>

//       {/* PRODUCT GRID */}
//       <motion.div
//         className="products-grid"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
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
 import ProductCard from "../../components/ProductCard";
import "../../Styles/PagesStyle/Products.css";

/* DUMMY PRODUCT DATA (can be replaced with API later) */
const productsData = [
  {
    id: 1,
    title: "LED Bulb 12W",
    description: "Energy efficient bright LED bulb",
    price: 120,
    unit: "piece",
    rating: 4.5,
    reviews: 230,
    image: "/products/bulb.jpg"
  },
  {
    id: 2,
    title: "Electrical Wire 90m",
    description: "High quality copper wire",
    price: 2100,
    unit: "roll",
    rating: 4.2,
    reviews: 180,
    image: "/products/wire.jpg"
  },
  {
    id: 3,
    title: "Modular Switch Board",
    description: "Premium modular switch board",
    price: 450,
    unit: "unit",
    rating: 4.7,
    reviews: 310,
    image: "/products/switch.jpg"
  },
  {
    id: 4,
    title: "MCB Switch",
    description: "Electrical safety MCB switch",
    price: 850,
    unit: "piece",
    rating: 4.4,
    reviews: 145,
    image: "/products/mcb.jpg"
  }
];

export default function Products() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  /* RESET SORT WHEN SEARCH CLEARS (optional but recommended) */
  useEffect(() => {
    if (search.trim() === "") {
      setSort("");
    }
  }, [search]);

  /* FILTER + SORT (IMMUTABLE & BUG-FREE) */
  const filteredProducts = useMemo(() => {
    let list = [...productsData]; // 🔥 DO NOT MUTATE ORIGINAL

    if (search.trim() !== "") {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "low-high") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [search, sort]);

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

      {/* PRODUCTS GRID */}
      <motion.div
        className="products-grid"
        initial="hidden"
        animate="visible"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p className="no-result">No products found</p>
        )}
      </motion.div>
    </section>
  );
}
