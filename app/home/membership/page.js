"use client";

import Link from "next/link";
import { Check, Crown, ShieldCheck, Zap } from "lucide-react";

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2417] py-16 px-6">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A96E]/10 text-[#C8A96E] text-xs font-extrabold tracking-wider mb-4">
            <Crown size={14} /> SAHAL SUUQ VIP
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ku Biir Xubinnimada Heerka Sare
          </h1>
          <p className="mt-4 text-gray-600 text-sm leading-6">
            Hel adeegyo gaar ah, qiimo dhimis joogto ah, iyo keenis la dedejiyay oo loogu talagalay macaamiisheenna muhiimka ah.
          </p>
        </div>

        {/* Pricing / Tiers */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Standard Tier */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#2D2417]">Sahal Classic</h3>
              <p className="text-xs text-gray-500 mt-1">Xubinnimada caadiga ah ee bilowga</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold">Bilaash</span>
                <span className="text-xs text-gray-500">/ weligiis</span>
              </div>
              <ul className="mt-8 space-y-4 text-sm text-gray-600">
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#C8A96E]" /> Raadraaca dalabyada (Order tracking)
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#C8A96E]" /> Taageerada macaamiisha ee caadiga ah
                </li>
              </ul>
            </div>
            <Link
              href="/orders"
              className="mt-8 block w-full py-3 text-center rounded-xl bg-gray-100 text-[#2D2417] text-xs font-extrabold hover:bg-gray-200 transition"
            >
              Hadda waa joogtaa
            </Link>
          </div>

          {/* VIP Tier */}
          <div className="bg-[#2D2417] text-white rounded-2xl p-8 border border-[#C8A96E]/30 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#C8A96E] text-[#2D2417] text-[10px] font-extrabold px-3 py-1 rounded-bl-xl tracking-widest">
              POPULAR
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#C8A96E]">Sahal VIP Elite</h3>
              <p className="text-xs text-gray-300 mt-1">Loogu talagalay macaamiisha dalbada badinta leh</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold">$15</span>
                <span className="text-xs text-gray-300">/ bishii</span>
              </div>
              <ul className="mt-8 space-y-4 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#C8A96E]" /> Keenis degdeg ah oo bilaash ah
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#C8A96E]" /> 10% qiimo dhimis ah badeecad walba
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#C8A96E]" /> Taageero gaar ah 24/7 ah
                </li>
              </ul>
            </div>
            <button
              onClick={() => alert("Nidaamka lacag-bixinta VIP dhowr ayuu soo geli doonaa!")}
              className="mt-8 block w-full py-3 text-center rounded-xl bg-[#C8A96E] text-[#2D2417] text-xs font-extrabold hover:bg-[#d8bb82] transition"
            >
              KU BIIR VIP HADDA
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}