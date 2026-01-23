import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUsPage from "./components/Pages/AboutUsPage";
import HomePage from "./components/Pages/HomePage";
import ContactOsome from "./components/Pages/Contact"; // your contact page
// import About from "./components/Pages/About"; // optional later
import Electricians from "./components/Pages/Electricians";
import Products from "./components/Pages/Products";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/Vicky-Electronics-" element={<HomePage />} />
        <Route path="/contact" element={<ContactOsome />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/electricians" element={<Electricians />} />
           <Route path="/product" element={<Products />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
