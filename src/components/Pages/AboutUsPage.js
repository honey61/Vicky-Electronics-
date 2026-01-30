import "../../Styles/PagesStyle/AboutUsPage.css";
import { motion } from "framer-motion";
const journeyData = [
  {
    year: "1980",
    title: "Founded",
    text: "Vicky Electronics was founded with a vision of trust and quality.",
    color: "journey-blue"
  },
  {
    year: "2000",
    title: "Service Expansion",
    text: "Expanded repair and service offerings for electronics and appliances.",
    color: "journey-green"
  },
  {
    year: "2000",
    title: "Customer Trust",
    text: "Built a strong and loyal customer base through honest service.",
    color: "journey-purple"
  },
  {
    year: "2001",
    title: "Growth & Excellence",
    text: "Continuing the journey with quality, innovation, and trust.",
    color: "journey-orange"
  }
];
/* Reusable animation variants */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export default function AboutUsPage() {
  return (
    <div className="about-page">

      {/* HERO */}
    <motion.section
  className="about-hero"
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
    About Vicky Electronics
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.35, duration: 0.6 }}
  >
    Trusted electronics store delivering quality products, reliable repairs,
    and honest service.
  </motion.p>
</motion.section>

      {/* WHO WE ARE */}
      <motion.section
        className="about-section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Who We Are</h2>
        <p>
          <strong>Vicky Electronics</strong> is a trusted local electronics store
          committed to providing genuine products, expert repair services, and
          excellent customer support. We believe in long-term relationships built
          on trust and transparency.
        </p>
      </motion.section>

      {/* SERVICES */}
      <motion.section
        className="about-services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h2 variants={fadeUp}>What We Do</motion.h2>

        <div className="services-grid">
          {[
            {
              title: "Electronics Sales",
              text: "Wide range of branded electronics, accessories, and home appliances."
            },
            {
              title: "Repair Services",
              text: "Professional repair services for mobiles, appliances, and electronics."
            },
            {
              title: "Customer Support",
              text: "Friendly guidance, after-sales support, and transparent pricing."
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
            >
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* WHY CHOOSE US */}
      <motion.section
        className="about-why"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Why Choose Us</h2>
        <ul>
          <li>✔ Trusted local store with years of experience</li>
          <li>✔ Genuine products & fair pricing</li>
          <li>✔ Skilled technicians & fast service</li>
          <li>✔ Customer-first approach</li>
        </ul>
      </motion.section>

      {/* MISSION & VISION */}
      <section className="about-mission">
        <motion.div
          className="mission-box"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Our Mission</h3>
          <p>
            To deliver reliable electronics and repair services while maintaining
            the highest standards of honesty and quality.
          </p>
        </motion.div>

        <motion.div
          className="vision-box"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Our Vision</h3>
          <p>
            To become the most trusted electronics partner in the region through
            service excellence and customer satisfaction.
          </p>
        </motion.div>
      </section>

      {/* JOURNEY */}
     {/* JOURNEY */}
<motion.section
  className="about-journey"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    Our Journey
  </motion.h2>

  <div className="journey-grid">
    {journeyData.map((item, index) => (
      <motion.div
        key={index}
        className={`journey-card ${item.color}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: true }}
      >
        <span className="journey-year">{item.year}</span>
        <h4>{item.title}</h4>
        <p>{item.text}</p>
      </motion.div>
    ))}
  </div>
</motion.section>
      {/* TEAM */}
      <motion.section
        className="about-team"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h2 variants={fadeUp}>Meet Our Team</motion.h2>

        <div className="team-grid">
          {[
            { name: "Vicky", role: "Founder" },
            { name: "Anjali", role: "Lead Technician" },
            { name: "Rohan", role: "Service Manager" }
          ].map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              variants={fadeUp}
              whileHover={{ y: -10 }}
            >
              <div className="avatar"></div>
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
