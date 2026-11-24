"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";

import api from "../lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/subscribe", {
        email: email.trim(),
      });

      alert(
        "Successfully subscribed to the newsletter!"
      );

      setEmail("");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Subscription failed. Please try again.";

      alert(
        typeof message === "string"
          ? message
          : "Subscription failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-[#2D2417] text-white">
      {/* MAIN FOOTER */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:px-8">

        {/* LEFT COLUMN: CENTERED LOGO ABOVE TEXT INSIDE GRID */}
        <div className="flex flex-col items-center text-center">
          <Link
            href="/home"
            className="inline-flex items-center justify-center"
            aria-label="Hel Suuq"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="205 212 390 368"
              className="h-24 w-auto"
              role="img"
              aria-label="HEL SUUQ Logo"
            >
              {/* Calaamada Sare (HS Monogram) */}
              <g fill="none" stroke="#C8A96E" strokeLinecap="butt" strokeLinejoin="miter">
                <path
                  d="M 324 228 C 338 228, 344 238, 344 252 L 344 348 C 344 362, 338 372, 324 372"
                  strokeWidth="6.5"
                />
                <path
                  d="M 476 228 C 462 228, 456 238, 456 252 L 456 348 C 456 362, 462 372, 476 372"
                  strokeWidth="6.5"
                />
                <line x1="344" y1="300" x2="381" y2="300" strokeWidth="5.5" />
                <line x1="419" y1="300" x2="456" y2="300" strokeWidth="5.5" />
                <path
                  d="M 434 245 C 428 229, 416 223, 400 223 C 378 223, 366 239, 366 261 C 366 279, 378 288, 400 300 S 434 321, 434 339 C 434 361, 422 377, 400 377 C 384 377, 372 371, 366 355"
                  strokeWidth="6.5"
                />
              </g>

              {/* Magaca HEL */}
              <text
                x="400"
                y="512"
                textAnchor="middle"
                fill="#FAF8F5"
                fontFamily="'Montserrat', 'Futura', 'Helvetica Neue', Arial, sans-serif"
                fontSize="74"
                fontWeight="700"
                letterSpacing="28"
              >
                HEL
              </text>

              {/* Qoraalka Hoose: — SUUQ — */}
              <g>
                <line x1="278" y1="558" x2="328" y2="558" stroke="#C8A96E" strokeWidth="1.5" />
                <text
                  x="400"
                  y="566"
                  textAnchor="middle"
                  fill="#C8A96E"
                  fontFamily="'Montserrat', 'Futura', 'Helvetica Neue', Arial, sans-serif"
                  fontSize="22"
                  fontWeight="500"
                  letterSpacing="14"
                >
                  SUUQ
                </text>
                <line x1="472" y1="558" x2="522" y2="558" stroke="#C8A96E" strokeWidth="1.5" />
              </g>
            </svg>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-gray-300">
            Waxaan gacantaada soo gaarsiineynaa
            badeecooyin caalami ah oo tayo sare leh
            iyo agabka nolosha casriga ah ee heerka sare ah,
            annagoo u soo gudbinayna si taxaddar weyn leh
            iyo hab dhijitaal ah oo aad u qurux badan.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#C8A96E]" />
            <div className="h-2 w-2 rounded-full bg-[#C8A96E]/50" />
            <div className="h-2 w-2 rounded-full bg-[#C8A96E]/30" />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xs font-extrabold tracking-[0.18em] text-[#C8A96E]">
            QUICK LINKS
          </h3>

          <div className="mt-5 flex flex-col gap-3">
            <Link
              href="/home/history"
              className="flex items-center justify-between border-b border-white/10 pb-3 text-sm text-gray-300 transition hover:text-[#C8A96E]"
            >
              Track Your Order
              <ChevronRight size={14} />
            </Link>

            <Link
              href="/home/membership"
              className="flex items-center justify-between border-b border-white/10 pb-3 text-sm text-gray-300 transition hover:text-[#C8A96E]"
            >
              Membership
              <ChevronRight size={14} />
            </Link>

            <Link
              href="/home/affiliate"
              className="flex items-center justify-between border-b border-white/10 pb-3 text-sm text-gray-300 transition hover:text-[#C8A96E]"
            >
              Affiliate
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xs font-extrabold tracking-[0.18em] text-[#C8A96E]">
            CONTACT
          </h3>

          <div className="mt-5 flex flex-col gap-4">
            <p className="flex items-center gap-3 text-sm text-gray-300">
              <Phone
                size={15}
                className="shrink-0 text-[#C8A96E]"
              />
              +252 63 6035585
            </p>

            <p className="flex items-center gap-3 text-sm text-gray-300">
              <Mail
                size={15}
                className="shrink-0 text-[#C8A96E]"
              />
              support@sahalsuuq.com
            </p>

            <p className="flex items-center gap-3 text-sm text-gray-300">
              <MapPin
                size={15}
                className="shrink-0 text-[#C8A96E]"
              />
              Hargeisa, Somaliland
            </p>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-xs font-extrabold tracking-[0.18em] text-[#C8A96E]">
            NEWSLETTER
          </h3>

          <p className="mt-5 text-sm leading-6 text-gray-300">
            Get notified about new arrivals and
            special offers.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mt-5 flex overflow-hidden rounded-xl border border-white/10 bg-white"
          >
            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Your Email"
              className="min-w-0 flex-1 px-3 py-3 text-sm text-[#2D2417] outline-none placeholder:text-gray-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#C8A96E] px-4 text-xs font-extrabold text-[#2D2417] transition hover:bg-[#d8bb82] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "..." : "JOIN"}
            </button>
          </form>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">

          <p className="text-center text-xs leading-5 text-gray-400 lg:text-left">
            © {new Date().getFullYear()} HEL SUUQ.
            <br />
            Engineered for absolute luxury.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400">
            <Link
              href="/home/privacy"
              className="transition hover:text-[#C8A96E]"
            >
              Privacy Policy
            </Link>

            <span>•</span>

            <Link
              href="/home/terms"
              className="transition hover:text-[#C8A96E]"
            >
              Terms of Service
            </Link>

            <span>•</span>

            <Link
              href="/home/sitemap"
              className="transition hover:text-[#C8A96E]"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}