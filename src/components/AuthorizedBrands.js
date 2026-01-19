import "../Styles/AuthorizedBrands.css";
import { motion } from "framer-motion";

const row1 = [
  { name: "Polycab", img: "../../images/BrandLogos/PolycabLogo.jpg", offset: -6 },
  { name: "Havells", img: "../../images/BrandLogos/HavellsLogo.jpg", offset: 8 },
  { name: "Crompton", img: "../../images/BrandLogos/CromptonLogo.png", offset: -4 },
  { name: "KEI", img: "../../images/BrandLogos/KeiLogo.png", offset: 10 }
];

const row2 = [
  { name: "Kirloskar", img: "../../images/BrandLogos/KirloskarLogo.jpg", offset: 6 },
  { name: "V-Guard", img: "../../images/BrandLogos/VguardLogo.png", offset: -8 },
  { name: "Orient", img: "../../images/BrandLogos/OrinetLogo.png", offset: 10 },
  { name: "Venus", img: "../../images/BrandLogos/VenusLogo.png", offset: -6 }
];

const row3 = [
  { name: "Cona", img: "../../images/BrandLogos/ConaLogo.jpg", offset: -10 },
  { name: "Polycab", img: "/brands/polycab.png", offset: 6 },
  { name: "Havells", img: "/brands/havells.png", offset: -4 },
  { name: "Crompton", img: "/brands/crompton.png", offset: 8 }
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
