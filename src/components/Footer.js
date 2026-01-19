import "../Styles/Footer.css";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

/* Animation variants */
const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="footer-container">

        {/* TOP SECTION */}
        <motion.div className="footer-top" variants={stagger}>

          {/* BRAND */}
          <motion.div className="footer-brand" variants={fadeUp}>
            <h3>Vicky Electronics</h3>
            <p>
              Trusted supplier of electrical & electronic products,
              delivering quality and reliability for homes and businesses.
            </p>

            <div className="footer-socials">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaYoutube />
            </div>
          </motion.div>

          {/* LINKS */}
          <motion.div className="footer-links" variants={fadeUp}>
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Products</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </motion.div>

          {/* LOCATION */}
          <motion.div className="footer-location" variants={fadeUp}>
            <h4>Our Location</h4>
            <p>
              <MdLocationOn />
              Rishikesh Road, Doiwala Chowk,<br />
              Dehradun, India
            </p>

            <a
              href="https://www.google.com/maps/place/Vicky+Electronic/@30.1759984,78.1221709,17z/data=!4m14!1m7!3m6!1s0x3909254dd42fc4c9:0x17145c8fb33bc90d!2sVicky+Electronic!8m2!3d30.1759984!4d78.1247458!16s%2Fg%2F11f40sd1nv!3m5!1s0x3909254dd42fc4c9:0x17145c8fb33bc90d!8m2!3d30.1759984!4d78.1247458!16s%2Fg%2F11f40sd1nv"
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn"
            >
              View on Map →
            </a>
          </motion.div>

        </motion.div>

        {/* HELP BAR */}
        <motion.div className="footer-help" variants={fadeUp}>
          <span>Need Help?</span>

          <a href="tel:+918126246330" className="help-item">
            <MdPhone />
            <p>+91 8126246330</p>
          </a>

          <a href="tel:+918077731486" className="help-item">
            <MdPhone />
            <p>+91 8077731486</p>
          </a>

          <a href="mailto:support@vickyelectronics.com" className="help-item">
            <MdEmail />
            <p>support@vickyelectronics.com</p>
          </a>
        </motion.div>

        {/* BOTTOM */}
        <motion.div className="footer-bottom" variants={fadeUp}>
          © {new Date().getFullYear()} Vicky Electronics. All rights reserved.
        </motion.div>

      </div>
    </motion.footer>
  );
}

export default Footer;
