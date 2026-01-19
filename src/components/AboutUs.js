import "../Styles/AboutUs.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

function AboutUs() {
    const navigate = useNavigate();
  return (
    <section className="about-new">
      <div className="about-wrapper">

        {/* LEFT – VISUAL BLOCKS */}
        <motion.div
          className="about-visual"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { h: "40+ Years", p: "Industry Experience" },
            { h: "500K+", p: "Trusted Customers" },
            { h: "1000+", p: "Quality Products" }
          ].map((item, i) => (
            <motion.div className="about-box" variants={fadeUp} key={i}>
              <h3>{item.h}</h3>
              <p>{item.p}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* RIGHT – CONTENT */}
        <motion.div
          className="about-content"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span className="about-label" variants={fadeUp}>
            ABOUT US
          </motion.span>

          <motion.h2 variants={fadeUp}>
            A Trusted Name in
            <span> Electrical & Electronic Solutions</span>
          </motion.h2>

          <motion.p variants={fadeUp}>
            Vicky Electronics has been serving homes, businesses, and
            contractors with reliable electrical and electronic products.
          </motion.p>

          <motion.p variants={fadeUp}>
            We partner with trusted manufacturers to deliver safe,
            high-performance products at competitive prices.
          </motion.p>
{/* MOBILE STATS (ONLY FOR MOBILE) */}
<motion.div
  className="about-stats-mobile"
  variants={stagger}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <motion.div className="stat-box" variants={fadeUp}>
    <h3>40+</h3>
    <span>Years</span>
  </motion.div>

  <motion.div className="stat-box" variants={fadeUp}>
    <h3>500K+</h3>
    <span>Customers</span>
  </motion.div>

  <motion.div className="stat-box" variants={fadeUp}>
    <h3>1000+</h3>
    <span>Products</span>
  </motion.div>
</motion.div>

          {/* POINTS */}
          <motion.div className="about-points" variants={stagger}>
            {[
              "Verified & branded products only",
              "Support for retailers & contractors",
              "Reliable after-sales service"
            ].map((txt, i) => (
              <motion.div variants={fadeUp} key={i}>
                <span>✔</span>
                <p>{txt}</p>
              </motion.div>
            ))}
          </motion.div>

         <motion.button
  className="about-cta"
  variants={fadeUp}
  onClick={() => navigate("/about")}
>
  Know More →
</motion.button>
        </motion.div>

      </div>
    </section>
  );
}

export default AboutUs;
