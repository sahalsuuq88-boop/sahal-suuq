'user client'

import React from 'react'

const TopBar = () => {
  return (
    <div>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1E1E1E] text-[#C5A880] text-[11px] font-bold tracking-widest uppercase py-2.5 px-4 text-center border-b border-stone-800">
        <span className="text-white/60 font-normal">⚡ Limited Offer:</span> Free Delivery on orders over $50 + 10% instant discount
      </div>
    </div>
  )
}

export default TopBar;
