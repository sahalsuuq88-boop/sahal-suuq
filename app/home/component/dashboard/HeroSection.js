
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Search, Heart, ArrowRight, Star, 
  Phone, Mail, MapPin, CheckCircle2 
} from "lucide-react";

const categories = ["ALL", "BASIC FOOD", "DRINKS", "COSMETICS", "PERSONAL CARE"];

const products = [
  { id: 1, name: "Premium Basmati Rice", category: "BASIC FOOD", price: "$18.50", image: "🌾", rating: 4.8, badge: "Best Seller" },
  { id: 2, name: "Organic Sunflower Oil", category: "BASIC FOOD", price: "$12.00", image: "🌻", rating: 4.5, badge: null },
  { id: 3, name: "Pure Natural Honey", category: "DRINKS", price: "$15.00", image: "🍯", rating: 4.9, badge: "Organic" },
  { id: 4, name: "Fresh Arabica Coffee", category: "DRINKS", price: "$22.00", image: "☕", rating: 4.7, badge: null },
  { id: 5, name: "Moisturizing Cream", category: "COSMETICS", price: "$25.40", image: "🧴", rating: 4.4, badge: "New" },
  { id: 6, name: "Herbal Shampoo", category: "PERSONAL CARE", price: "$9.99", image: "🧼", rating: 4.6, badge: null },
];

  const WorldClassEcommerce = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [likedProducts, setLikedProducts] = useState([]);

  const toggleLike = (id) => {
    setLikedProducts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans antialiased selection:bg-[#C5A880] selection:text-white">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1E1E1E] text-[#C5A880] text-[11px] font-bold tracking-widest uppercase py-2.5 px-4 text-center border-b border-stone-800">
        <span className="text-white/60 font-normal">⚡ Limited Offer:</span> Free Delivery on orders over $50 + 10% instant discount
      </div>

      {/* 2. PREMIUM NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-stone-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <span className="text-2xl font-black tracking-tighter text-stone-900">
              AWL<span className="text-[#C5A880] font-light">ONLINE</span>
            </span>
          </motion.div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10 text-xs font-semibold tracking-widest text-stone-600">
            {["HOME", "SHOP", "CATEGORIES", "ABOUT US", "CONTACT"].map((link, idx) => (
              <motion.a 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={link} 
                href="#" 
                className="relative py-2 hover:text-stone-950 transition-colors duration-300 group"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          {/* Action Icons */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <button className="p-2.5 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-all">
              <Search className="w-4.5 h-4.5" />
            </button>
            
            <button className="p-2.5 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-all relative">
              <Heart className="w-4.5 h-4.5" />
              {likedProducts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C5A880] rounded-full" />
              )}
            </button>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-stone-950 text-white rounded-lg hover:bg-[#A4865A] transition-all duration-300 shadow-sm hover:shadow-md flex items-center space-x-2 px-4 py-2.5 text-xs font-bold tracking-wider"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>CART (0)</span>
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* 3. HERO LUXURY SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#161616] via-[#1E1E1E] to-[#2D2A24] text-white py-24 lg:py-32">
        {/* Decorative Background Blurred Orbs */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-stone-600/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping" />
              <span className="text-[10px] font-bold tracking-widest text-[#C5A880] uppercase">Premium Global Sourcing</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-[1.15] tracking-wide text-stone-100">
              Carry the World <br />
              <span className="italic text-[#C5A880] font-normal font-sans">with Taste.</span>
            </h1>
            
            <p className="text-stone-400 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base font-light leading-relaxed">
              Discover curated high-end essentials designed for those who appreciate premium quality. From elite organic nutrition to elegant daily wellness.
            </p>

            {/* Quick Badges directly matching image_d8de59.jpg structure */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-stone-400 text-xs py-2 border-t border-b border-white/5">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                <span><strong>500+</strong> Premium Items</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                <span><strong>100%</strong> Organic Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                <span>Free Global Delivery</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <motion.button 
                whileHover={{ y: -2 }}
                className="group flex items-center justify-center space-x-3 bg-[#C5A880] text-stone-950 font-bold text-xs tracking-widest px-8 py-4 rounded shadow-xl shadow-[#C5A880]/10 hover:bg-[#B3956D] transition-all"
              >
                <span>EXPLORE COLLECTIONS</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <button className="border border-stone-700 text-stone-300 hover:text-white hover:border-stone-400 text-xs tracking-widest font-bold px-8 py-4 rounded transition-all backdrop-blur-sm">
                OUR STORY
              </button>
            </div>
          </motion.div>

          {/* Right Product Card Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end z-10"
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl bg-gradient-to-b from-stone-800/40 to-stone-900/40 border border-stone-800 p-8 flex flex-col justify-between shadow-2xl backdrop-blur-md group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="flex justify-between items-start">
                <span className="text-5xl drop-shadow-lg">✨</span>
                <span className="text-[10px] font-bold tracking-widest bg-stone-900 text-[#C5A880] px-3 py-1.5 rounded border border-stone-800">
                  EST. 2026
                </span>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold tracking-wider text-[#C5A880]">AWL SIGNATURE COLLECTION</span>
                <h3 className="text-3xl font-serif font-light text-stone-100">The Taste of Pure Luxury</h3>
                <p className="text-xs text-stone-400 leading-relaxed">Every item is sealed with absolute perfection and verified by international culinary and health standard bodies.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. MINIMALIST CATEGORY TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-2 mb-10">
          <span className="text-[10px] font-bold tracking-widest text-[#A4865A] uppercase">Curated Catalog</span>
          <h2 className="text-2xl font-serif text-stone-900">Shop by Department</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 border-b border-stone-200/60 pb-5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 text-[11px] font-bold tracking-widest transition-all duration-300 rounded ${
                activeCategory === category
                  ? "bg-stone-950 text-white shadow-sm"
                  : "bg-white text-stone-500 hover:text-stone-950 border border-stone-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* 5. PREMIUM HIGH-FIDELITY PRODUCT GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isLiked = likedProducts.includes(product.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className="group bg-white rounded-xl border border-stone-200/70 p-5 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Absolute Top Cards items */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                    {product.badge && (
                      <span className="text-[9px] font-bold tracking-widest bg-[#C5A880] text-stone-950 px-2 py-0.5 rounded uppercase">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <button 
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-xs rounded-full text-stone-400 hover:text-red-500 border border-stone-100 shadow-xs hover:scale-110 transition-all z-10"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </button>

                  <div>
                    {/* Visual Container */}
                    <div className="w-full h-52 bg-stone-50 rounded-lg flex items-center justify-center text-7xl mb-5 relative overflow-hidden group-hover:bg-stone-100/50 transition-colors duration-300">
                      <motion.span 
                        className="inline-block"
                        whileHover={{ scale: 1.12, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {product.image}
                      </motion.span>
                    </div>
                    
                    {/* Meta details */}
                    <span className="text-[9px] font-bold tracking-widest text-[#A4865A] uppercase">{product.category}</span>
                    <h3 className="font-serif font-normal text-stone-900 text-base mt-1 group-hover:text-[#C5A880] transition-colors duration-200">
                      {product.name}
                    </h3>
                    
                    {/* Ratings */}
                    <div className="flex items-center space-x-1 mt-1.5">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-stone-500 pl-1">{product.rating}</span>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-100">
                    <span className="text-xl font-medium tracking-tight text-stone-950">{product.price}</span>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      className="text-[10px] font-bold tracking-widest text-stone-900 bg-stone-100 hover:bg-stone-950 hover:text-white px-4 py-2.5 rounded transition-all duration-300 uppercase"
                    >
                      Add To Cart
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* 6. WORLD-CLASS HIGH FOOTER */}
      <footer className="bg-[#1E1E1E] text-stone-400 border-t border-stone-800">
        
        {/* Main Grid Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-stone-800/60">
          
          <div className="space-y-4">
            <span className="text-xl font-black tracking-tight text-white">AWL<span className="text-[#C5A880] font-light">ONLINE</span></span>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Bringing premium international products and high-end lifestyle essentials right into your hands with extreme care and digital elegance.
            </p>
            {/* Social Icons matching file structure */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-stone-900 rounded-md hover:bg-[#C5A880] hover:text-stone-950 transition-all">Facebook</a>
              <a href="#" className="p-2 bg-stone-900 rounded-md hover:bg-[#C5A880] hover:text-stone-950 transition-all"> Instigram</a>
              <a href="#" className="p-2 bg-stone-900 rounded-md hover:bg-[#C5A880] hover:text-stone-950 transition-all"> twitter</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Premium Membership</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Affiliate Program</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase">Contact Info</h4>
            <ul className="space-y-3 text-xs font-light">
              <li className="flex items-center space-x-2.5 text-stone-500"><Phone className="w-4 h-4 text-[#C5A880]" /> <span>+252 (0) 63 XXXXXXX</span></li>
              <li className="flex items-center space-x-2.5 text-stone-500"><Mail className="w-4 h-4 text-[#C5A880]" /> <span>support@awl.online</span></li>
              <li className="flex items-center space-x-2.5 text-stone-500"><MapPin className="w-4 h-4 text-[#C5A880]" /> <span>Hargeisa, Somaliland</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase">Newsletter</h4>
            <p className="text-xs text-stone-500 font-light">Subscribe to get notified about luxury arrivals and secret drops.</p>
            <div className="flex items-center bg-stone-900 rounded p-1 border border-stone-800">
              <input type="email" placeholder="Your Email" className="bg-transparent text-xs px-3 py-2 w-full focus:outline-hidden text-white" />
              <button className="bg-[#C5A880] text-stone-950 px-4 py-2 font-bold text-[10px] tracking-widest rounded uppercase hover:bg-[#B3956D] transition-colors">Join</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium tracking-wide text-stone-500">
          <p>© {new Date().getFullYear()} AWL ONLINE. Engineered for absolute luxury.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
export default WorldClassEcommerce;