'use client'

import React, { useState } from 'react'

const categories = ['ALL', "BASIC FOOD", "DRINKS", "COSMETICS", "PERSONAL CARE"]
const Category = () => {
    const [activeCategory, setActiveCategory] =useState("All");
  return (
    <div>
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
      
    </div>
  )
}

export default Category
