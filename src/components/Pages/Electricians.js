


// import "../Styles/Electricians.css";
// import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
// import { motion } from "framer-motion";

// const cardAnim = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: "easeOut" }
//   }
// };

// const electricians = [
//   {
//     name: "Ramesh Kumar",
//     experience: "12 Years",
//     expertise: "Residential & Commercial Wiring",
//     phone: "+919876543210",
//     image: "/electricians/e1.jpg"
//   },
//   {
//     name: "Amit Sharma",
//     experience: "8 Years",
//     expertise: "Industrial Electricals",
//     phone: "+919812345678",
//     image: "/electricians/e2.jpg"
//   },
//   {
//     name: "Suresh Verma",
//     experience: "15 Years",
//     expertise: "Panel & Maintenance",
//     phone: "+919899887766",
//     image: "/electricians/e3.jpg"
//   },
//   {
//     name: "Rahul Singh",
//     experience: "6 Years",
//     expertise: "Home Automation",
//     phone: "+919911223344",
//     image: "/electricians/e4.jpg"
//   }
// ];

// export default function Electricians() {
//   return (
//     <section className="electricians-page">
//       <motion.h1
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         Our Electricians
//       </motion.h1>

//       <motion.div
//         className="electricians-grid"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//       >
//         {electricians.map((e, i) => (
//           <motion.div
//             className="electrician-card"
//             variants={cardAnim}
//             whileHover={{ y: -6, scale: 1.02 }}
//             key={i}
//           >
//             {/* IMAGE */}
//             <div className="avatar">
//               <img src={e.image} alt={e.name} />
//             </div>

//             <h3>{e.name}</h3>
//             <p><strong>Experience:</strong> {e.experience}</p>
//             <p><strong>Expertise:</strong> {e.expertise}</p>
//             <p className="phone">{e.phone}</p>

//             {/* ACTIONS */}
//             <div className="card-actions">
//               <a href={`tel:${e.phone}`} className="call-btn">
//                 <FaPhoneAlt /> Call
//               </a>

//               <a
//                 href={`https://wa.me/${e.phone.replace("+", "")}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="whatsapp-btn"
//               >
//                 <FaWhatsapp /> WhatsApp
//               </a>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </section>
//   );
// }
















import "../../Styles/PagesStyle/Electricians.css";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const electricians = [
  {
    name: "Ramesh Kumar",
    experience: "12 Years",
    expertise: "Residential & Commercial Wiring",
    phone: "+919876543210"
  },
  {
    name: "Amit Sharma",
    experience: "8 Years",
    expertise: "Industrial Electricals",
    phone: "+919812345678"
  },
  {
    name: "Suresh Verma",
    experience: "15 Years",
    expertise: "Panel & Maintenance",
    phone: "+919899887766"
  },
  {
    name: "Rahul Singh",
    experience: "6 Years",
    expertise: "Home Automation",
    phone: "+919911223344"
  }
];

 function Electricians() {
  return (
    <section className="electricians-page">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Our Electricians
      </motion.h1>

      <div className="electricians-grid">
        {electricians.map((e, i) => (
          <motion.div
            className="electrician-card"
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3>{e.name}</h3>

            <p><strong>Experience:</strong> {e.experience}</p>
            <p><strong>Expertise:</strong> {e.expertise}</p>
            <p className="phone">{e.phone}</p>

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
