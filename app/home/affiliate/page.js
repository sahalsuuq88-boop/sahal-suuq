"use client";

import Link from "next/link";
import { DollarSign, Share2, TrendingUp, Users } from "lucide-react";

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2417] py-16 px-6">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A96E]/10 text-[#C8A96E] text-xs font-extrabold tracking-wider mb-4">
            <TrendingUp size={14} /> EARN WITH US
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Barnaamijka La-hawlgalayaasha (Affiliate)
          </h1>
          <p className="mt-4 text-gray-600 text-sm leading-6">
            La wadaag badeecadaha Sahal Suuq saaxiibbadaada iyo bulshadaada, kana hel komishan lacag ah iib kasta oo ku yimaada link-gaaga gaarka ah.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#C8A96E]/10 flex items-center justify-center text-[#C8A96E] font-extrabold mb-4">
              1
            </div>
            <h3 className="font-bold text-base">Isdiiwaangeli</h3>
            <p className="text-xs text-gray-500 mt-2 leading-5">
              Noqo xubin ka tirsan barnaamijka si aad u hesho link-gaaga gaarka ah ee suuq-geynta.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#C8A96E]/10 flex items-center justify-center text-[#C8A96E] font-extrabold mb-4">
              2
            </div>
            <h3 className="font-bold text-base">La Wadaag</h3>
            <p className="text-xs text-gray-500 mt-2 leading-5">
              Ku baahiy لینک-gaaga baraha bulshada, WhatsApp, ama mareegtaada si dadku u iibsadaan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#C8A96E]/10 flex items-center justify-center text-[#C8A96E] font-extrabold mb-4">
              3
            </div>
            <h3 className="font-bold text-base">Lacag Hel</h3>
            <p className="text-xs text-gray-500 mt-2 leading-5">
              Ka hel komishan boqolkiiba ah dalab kasta oo guulaysta adigoo si sahlan u qaadanaya.
            </p>
          </div>
        </div>

        {/* Action Box */}
        <div className="mt-12 bg-[#2D2417] text-white p-8 rounded-2xl text-center">
          diyaar ma u tahay inaad bilowdo safarkaaga dakhli-abuurka?
          <div className="mt-6">
            <button
              onClick={() => alert("Fadlan kala xiriir maamulka support@sahalsuuq.com si laguu furo akoonka Affiliate-ka.")}
              className="px-6 py-3 rounded-xl bg-[#C8A96E] text-[#2D2417] text-xs font-extrabold hover:bg-[#d8bb82] transition"
            >
              COSOBOOFI AKOONKA
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}