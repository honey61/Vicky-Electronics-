import "../Styles/AuthorizedBrands.css";
import { motion } from "framer-motion";
import polycab from "../assests/images/BrandLogos/PolycabLogo.jpg";
import havells from "../assests/images/BrandLogos/HavellsLogo.jpg";
import crompton from "../assests/images/BrandLogos/CromptonLogo.png";
import kei from "../assests/images/BrandLogos/KeiLogo.png"; 
import kirloskar from "../assests/images/BrandLogos/KirloskarLogo.jpg";
import vguard from "../assests/images/BrandLogos/VguardLogo.png";
import orient from "../assests/images/BrandLogos/OrientLogo.png";
import venus from "../assests/images/BrandLogos/VenusLogo.png";
import cona from "../assests/images/BrandLogos/ConaLogo.jpg";   


const row1 = [
  { name: "Polycab", img: polycab, offset: -6 },
  { name: "Havells", img: havells, offset: 8 },
  { name: "Crompton", img: crompton, offset: -4 },
  { name: "KEI", img: kei, offset: 10 },
    { name: "V-Guard", img: vguard, offset: -8 },
  { name: "Orient", img: orient, offset: 10 },
];

const row2 = [
  { name: "Kirloskar", img: kirloskar, offset: 6 },
  { name: "V-Guard", img: vguard, offset: -8 },
  { name: "Orient", img: orient, offset: 10 },
  { name: "Venus", img: venus, offset: -6 },
   { name: "Cona", img: cona, offset: -10 },
  { name: "Polycab", img: polycab, offset: 6 },
  { name: "Havells", img: havells, offset: -4 },
];

const row3 = [
    { name: "V-Guard", img: vguard, offset: -8 },
  { name: "Orient", img: orient, offset: 10 },

  { name: "Havells", img: havells, offset: -4 },
  { name: "Crompton", img: crompton, offset: 8 },
    { name: "Cona", img: cona, offset: -10 },
  { name: "Polycab", img: polycab, offset: 6 },
];

function BrandRow({ brands, duration }) {
  return (
    <div className="brands-marquee">
      <motion.div
  className="brands-track"
  animate={{ x: ["0%", "-20%"] }}
  transition={{
    repeat: Infinity,
    duration,
    ease: "linear"
  }}
>

        {[...brands, ...brands].map((brand, i) => (
          <div
            className="brand-logo"
            key={i}
            style={{ transform: `translateY(${brand.offset}px)` }}
          >
            <img src={brand.img} alt={brand.name} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function AuthorizedBrands() {
  return (
    <section className="brands-section">
      <div className="brands-container">

        {/* HEADER */}
        <div className="brands-header">
          <span className="brands-tag">AUTHORIZED RETAILER</span>
          <h2>
            We Are Genuine Retailers of
            <span> Trusted Electrical Brands</span>
          </h2>
          <p>
            All products are 100% original and supplied directly from
            authorized distributors.
          </p>
        </div>

        {/* 3 ROWS */}
        <BrandRow brands={row1} duration={22} />
        <BrandRow brands={row2} duration={26} />
        <BrandRow brands={row3} duration={30} />

        {/* FOOTER */}
        <div className="brands-footer">
          ✔ Authorized Dealers • ✔ Manufacturer Warranty • ✔ Trusted by Thousands
        </div>

      </div>
    </section>
  );
}
