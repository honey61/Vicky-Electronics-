import "../../Styles/PagesStyle/Contact.css";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
/* Animations */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

export default function Contact() {
    const navigate = useNavigate();
  return (
    <div className="osome-contact">

      {/* TOP SECTION */}
      <motion.section
        className="contact-top"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <motion.h1 variants={fadeUp} >Contact us</motion.h1>

        <motion.p className="subtitle" variants={fadeUp}>
          Get in touch and ask us anything. The difference between bookkeeping
          and accounting, can you start a company from Madagascar, which
          business literature our CEO prefers – we answer it all.
        </motion.p>

        {/* FORM */}
        <motion.div
          className="contact-form"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="form-row" variants={fadeUp}>
            <input placeholder="Your name" />
            <input placeholder="Email address" />
          </motion.div>

          <motion.div className="form-row" variants={fadeUp}>
            <div className="phone-input">
              <span>🇮🇹</span>
              <input placeholder="+39 999 999999" />
            </div>
          </motion.div>

          <motion.textarea
            placeholder="How can we help?"
            variants={fadeUp}
          />

          <motion.button
            className="send-btn"
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send your message
          </motion.button>

          <motion.p className="terms" variants={fadeUp}>
            By clicking, you agree to our
            <span> Terms & Conditions</span>, <span>Privacy</span> and
            <span> Data Protection Policy</span>.
          </motion.p>
        </motion.div>

        {/* ILLUSTRATIONS */}
        <motion.img
          src="/left-illustration.svg"
          className="illus left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.img
          src="/right-illustration.svg"
          className="illus right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </motion.section>

      {/* MAP SECTION */}
      <motion.section
        className="contact-map-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <motion.h2 variants={fadeUp}>Get in touch with Vicky Electronics & Electricals </motion.h2>

        <div className="map-layout">
         <motion.iframe
  title="map"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.778842858112!2d78.1221709!3d30.1759984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909254dd42fc4c9:0x17145c8fb33bc90d!2sVicky%20Electronic!5e0!3m2!1sen!2sin!4v1700000000000"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  variants={fadeUp}
/>


          <motion.div className="address-card" variants={fadeUp}>
            <h4>Address</h4>
            <p>Doiwala chowk , Rishikesh Road <br /> Dehradun, Uttarakhand - 248140

            </p>

            <h4>Email</h4>
            <p>vickyelectronics812@gmail.com</p>

            <h4>Phone</h4>
            <p>8126246330</p>

            <div className="socials">
              <span>f</span>
              <span>x</span>
              <span>in</span>
              <span>▶</span>
              <span>◎</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
}
