import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUsPage from "./components/Pages/AboutUsPage";
import HomePage from "./components/Pages/HomePage";
import ContactOsome from "./components/Pages/Contact"; // your contact page
// import About from "./components/Pages/About"; // optional later
import Electricians from "./components/Pages/Electricians";
import Products from "./components/Pages/Products";
import ScrollToTop from "./components/ScrollToTop";
import Chatbot from "./components/Pages/Chatbot";
import ProductDetail from "./components/Pages/ProductDetail";
function App() {
  return (
    <Router>
       <ScrollToTop />
        <Chatbot />
      <Navbar />
      <Routes>
        <Route path="/Vicky-Electronics-" element={<HomePage />} />
        <Route path="/contact" element={<ContactOsome />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/electricians" element={<Electricians />} />
           <Route path="/product" element={<Products />} />
           <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
