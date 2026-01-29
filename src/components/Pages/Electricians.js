
import { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/PagesStyle/Electricians.css";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

/* Default electrician image */
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
      const res = await axios.get("http://localhost:8080/api/electricians");

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
    <section className="electricians-page">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Our Electricians
      </motion.h1>

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

            <p>
              <strong>Experience:</strong>{" "}
              {e.experience ? `${e.experience} Years` : "—"}
            </p>

            <p>
              <strong>Expertise:</strong>{" "}
              {e.specialization || "General Electrical"}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {e.area || "General Electrical"}
            </p>

            <p className="phone"> Call : {e.phone}</p>

            {/* ACTIONS */}
            <div className="card-actions">
              <a href={`tel:${e.phone}`} className="call-btn">
                <FaPhoneAlt /> Call
              </a>

              <a
                href={`https://wa.me/${e.phone.replace("+", "")}`}
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
  );
}

export default Electricians;
