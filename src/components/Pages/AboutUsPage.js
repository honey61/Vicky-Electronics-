import "../../Styles/PagesStyle/AboutUsPage.css";

export default function AboutUsPage() {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <h1>About Vicky Electronics</h1>
        <p>
          Trusted electronics store delivering quality products, reliable repairs,
          and honest service.
        </p>
      </section>

      {/* WHO WE ARE */}
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          <strong>Vicky Electronics</strong> is a trusted local electronics store
          committed to providing genuine products, expert repair services, and
          excellent customer support. We believe in long-term relationships built
          on trust and transparency.
        </p>
      </section>

      {/* SERVICES */}
      <section className="about-services">
        <h2>What We Do</h2>

        <div className="services-grid">
          <div className="service-card">
            <h3>Electronics Sales</h3>
            <p>
              Wide range of branded electronics, accessories, and home appliances.
            </p>
          </div>

          <div className="service-card">
            <h3>Repair Services</h3>
            <p>
              Professional repair services for mobiles, appliances, and electronics.
            </p>
          </div>

          <div className="service-card">
            <h3>Customer Support</h3>
            <p>
              Friendly guidance, after-sales support, and transparent pricing.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="about-why">
        <h2>Why Choose Us</h2>
        <ul>
          <li>✔ Trusted local store with years of experience</li>
          <li>✔ Genuine products & fair pricing</li>
          <li>✔ Skilled technicians & fast service</li>
          <li>✔ Customer-first approach</li>
        </ul>
      </section>

      {/* MISSION & VISION */}
      <section className="about-mission">
        <div className="mission-box">
          <h3>Our Mission</h3>
          <p>
            To deliver reliable electronics and repair services while maintaining
            the highest standards of honesty and quality.
          </p>
        </div>

        <div className="vision-box">
          <h3>Our Vision</h3>
          <p>
            To become the most trusted electronics partner in the region through
            service excellence and customer satisfaction.
          </p>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="about-journey">
        <h2>Our Journey</h2>
        <ul>
          <li><strong>1980</strong> – Vicky Electronics was founded</li>
          <li><strong>2000</strong> – Expanded repair & service offerings</li>
          <li><strong>2000</strong> – Built a strong loyal customer base</li>
          <li><strong>2001</strong> – Serving with trust & quality</li>
        </ul>
      </section>

      {/* TEAM */}
      <section className="about-team">
        <h2>Meet Our Team</h2>

        <div className="team-grid">
          <div className="team-card">
            <div className="avatar"></div>
            <h4>Vicky</h4>
            <p>Founder</p>
          </div>

          <div className="team-card">
            <div className="avatar"></div>
            <h4>Anjali</h4>
            <p>Lead Technician</p>
          </div>

          <div className="team-card">
            <div className="avatar"></div>
            <h4>Rohan</h4>
            <p>Service Manager</p>
          </div>
        </div>
      </section>

    </div>
  );
}
