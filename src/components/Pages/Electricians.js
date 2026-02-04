import { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/PagesStyle/Electricians.css";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const DEFAULT_ELECTRICIAN_IMG =
  "https://media.istockphoto.com/id/663984670/vector/electrician.jpg?s=2048x2048&w=is&k=20&c=IGFnc1ueeTEc86OHvs8dYd2Q7-ThUbufBodon_OcGWQ=";

function Electricians() {
  const [electricians, setElectricians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchElectricians();
  }, []);

  const fetchElectricians = async () => {
    try {
      const res = await axios.get("https://vicky-ele-server-1.onrender.com/api/electricians");
      const activeElectricians = res.data.filter(
        (e) => e.status === "Active"
      );
      setElectricians(activeElectricians);
    } catch (err) {
      console.error("Error fetching electricians:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="electricians-page">

      {/* HERO (Like About Us but different color) */}
    <motion.section
  className="electricians-hero"
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
    Our Electricians
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.35, duration: 0.6 }}
  >
    Skilled, verified, and trusted electricians ready to serve you
    with safe and reliable electrical solutions.
  </motion.p>
</motion.section>


      {/* CONTENT */}
      <section className="electricians-content">
        {loading && <p className="loading-text">Loading electricians...</p>}

        {!loading && electricians.length === 0 && (
          <p className="no-electricians">No electricians available</p>
        )}

        <div className="electricians-grid">
          {electricians.map((e, i) => (
            <motion.div
              className="electrician-card"
              key={e._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* IMAGE */}
              <div className="electrician-image">
                <img
                  src={e.image || DEFAULT_ELECTRICIAN_IMG}
                  alt={e.name}
                />
              </div>

              {/* INFO */}
              <h3>{e.name}</h3>

              <p><strong>Experience:</strong> {e.experience ? `${e.experience} Years` : "—"}</p>
              <p><strong>Expertise:</strong> {e.specialization || "General Electrical"}</p>
              <p><strong>Location:</strong> {e.area || "—"}</p>
              <p className="phone">📞 {e.phone}</p>

              {/* ACTIONS */}
              <div className="card-actions">
                <a href={`tel:${e.phone}`} className="call-btn">
                  <FaPhoneAlt /> Call
                </a>

               <a
  href={`https://wa.me/${e.phone.replace("+", "")}?text=${encodeURIComponent(
    `Hello ${e.name}, I found your contact on Vicky Electricians website.`
  )}`}
  target="_blank"
  rel="noreferrer"
  className="whatsapp-btn"
>
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Electricians;
