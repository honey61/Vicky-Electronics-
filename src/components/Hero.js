import "../Styles/Hero.css";
import { motion } from "framer-motion";


function Hero() {
  
  return (
    <div className="home">

      {/* LEFT SOCIAL BAR */}
    <motion.div
  className="left-bar"
  initial={{ x: -60, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
>
  <a href="#" className="icon">
    <i className="fab fa-linkedin-in"></i>
  </a>
  <a href="#" className="icon">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="#" className="icon">
    <i className="fab fa-youtube"></i>
  </a>

  <div className="social-line"></div>
  <span className="lang">EN / FR</span>
</motion.div>


      {/* MAIN CONTENT */}
      <div className="content">
        <div className="left-text">
          <motion.h1
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            VICKY <br />
            ELECTRONICS
          </motion.h1>

          <motion.div
  className="tags"
  initial={{ y: 40, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
>
  <span>Wholesaler</span>
  <span>Retailer</span>
</motion.div>

{/* DESCRIPTION */}
<motion.p
  initial={{ y: 40, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
>
  Premium electrical & electronic products designed to
  elevate your everyday living experience.
</motion.p>
        </div>
      </div>

      {/* FADE OVERLAY */}
      <div className="fade"></div>
    </div>
  );
}

export default Hero;
