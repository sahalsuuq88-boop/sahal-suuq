"use client";

import Link from "next/link";

export default function darkLogo() {
  return (
    <Link
      href="/"
      className="flex items-center"
      aria-label="Sahal Suuq"
    >
      {/* Logo SVG - Iyada oo leh Sahal-Suuq Vector Paths */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="270 215 260 365"
        className="h-22 w-auto"
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

        {/* Magaca HEL (Ku beddel fill="#FAF8F5" haddii aad gelinayso meel madow sida Footer-ka) */}
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

      {/* Text - Sahal-Suuq */}

    </Link>
  );
}