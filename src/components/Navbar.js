
// import "../Styles/Navbar.css";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { FaTimes } from "react-icons/fa";

// function Navbar() {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const handleNav = (path) => {
//     navigate(path);
//     setOpen(false);
//   };

//   return (
//     <>
//       {/* TOP NAV */}
//       <div className="top-nav">
//         <div className="logo">
//           <motion.span>VE</motion.span>
//           <motion.div>
//             <small>Vicky Electronics</small>
//             <small>India / Uattarakhand </small>
//           </motion.div>
//         </div>

//         {/* DESKTOP MENU */}
//         <ul className="desktop-menu">
//           <li onClick={() => navigate("/")}>Work</li>
//           <li onClick={() => navigate("/about")}>About</li>
//           <li onClick={() => navigate("/contact")}>Contact</li>
//           <li onClick={()=> navigate("/electricians")}>Electricians</li>
//         </ul>

//         {/* HAMBURGER */}
//         <div className="hamburger" onClick={() => setOpen(true)}>
//           <span />
//           <span />
//           <span />
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             className="mobile-menu"
//             initial={{ y: "-100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "-100%" }}
//             transition={{ duration: 0.45, ease: "easeOut" }}
//           >
//             {/* HEADER */}
//             <div className="mobile-menu-header">
//               <h3>Vicky Electronics</h3>
//               <button className="close-btn" onClick={() => setOpen(false)}>
//                 <FaTimes />
//               </button>
//             </div>

//             {/* LINKS */}
//             <ul>
//               <li onClick={() => handleNav("/")}>Work</li>
//               <li onClick={() => handleNav("/about")}>About</li>
//               <li onClick={() => handleNav("/contact")}>Contact</li>
//                <li onClick={()=> navigate("/electricians")}>Electricians</li>
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// export default Navbar;
import "../Styles/Navbar.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNav = (path) => {
    navigate(path);
    setOpen(false);
  };

  /* SCROLL GLASS EFFECT */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ================= TOP NAV ================= */}
      <div className={`top-nav ${scrolled ? "scrolled" : ""}`}>
        {/* LOGO */}
        <div className="logo" onClick={() => navigate("/")}>
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            VE
          </motion.span>

          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <small>Vicky Electronics</small>
            <small>India / Uttarakhand</small>
          </motion.div>
        </div>

        {/* DESKTOP MENU */}
        <ul className="desktop-menu">
          <li onClick={() => navigate("/")}>Work</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/electricians")}>Electricians</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>

        {/* HAMBURGER */}
        {/* HAMBURGER / CLOSE ICON */}
<div className="hamburger" onClick={() => setOpen(!open)}>
  {open ? (
    <FaTimes size={20} />
  ) : (
    <>
      <span />
      <span />
      <span />
    </>
  )}
</div>
      </div>

      {/* ================= MOBILE MENU ================= */}
    <AnimatePresence>
  {open && (
    <motion.div
      className="mobile-menu"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <ul>
        <li onClick={() => handleNav("/Vicky-Electronics-")}>Work</li>
        <li onClick={() => handleNav("/about")}>About</li>
        <li onClick={() => handleNav("/electricians")}>Electricians</li>
        <li onClick={() => handleNav("/contact")}>Contact</li>
      </ul>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}

export default Navbar;
