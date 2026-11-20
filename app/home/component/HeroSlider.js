"use client";

export default function HeroSlide({ item }) {
  const isDark = item?.isDark;

  const textColor = isDark ? "text-white" : "text-[#17251D]";

  const descriptionColor = isDark ? "text-gray-100" : "text-gray-600";

  const buttonClass = isDark
    ? "bg-[#C8A96E] text-[#17251D] hover:bg-[#d8bb82]"
    : "bg-[#2D2417] text-white hover:bg-[#463827]";

  const isBlue = !isDark && item?.backgroundColor === "#D1EBF3";

  return (
    <div
      className="
        relative
        flex
        min-h-[420px]
        w-full
        items-center
        overflow-hidden
        bg-cover
        bg-center
        sm:min-h-[500px]
        lg:min-h-[570px]
      "
      style={{
        backgroundImage: `url(${item?.backgroundImage})`,
      }}
    >
      {/* =====================================
          MAIN GRADIENT OVERLAY
      ====================================== */}

      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(to right, rgba(96,58,40,0.96), rgba(96,58,40,0.82), rgba(45,36,23,0.62), rgba(45,36,23,0.20))"
            : isBlue
              ? "linear-gradient(to right, rgba(209,235,243,0.96), rgba(209,235,243,0.82), rgba(255,255,255,0.45), rgba(255,255,255,0.15))"
              : "linear-gradient(to right, rgba(234,228,217,0.97), rgba(234,228,217,0.88), rgba(255,255,255,0.55), rgba(255,255,255,0.18))",
        }}
      />

      {/* =====================================
          BOTTOM GRADIENT
      ====================================== */}

      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.18) 65%, rgba(11,59,36,0.45) 100%)"
            : "linear-gradient(to bottom, transparent 0%, rgba(250,248,245,0.12) 65%, rgba(250,248,245,0.45) 100%)",
        }}
      />

      {/* =====================================
          CONTENT
      ====================================== */}

      {/* =====================================
    CONTENT
===================================== */}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-[620px]">
          {/* 1. TITLE */}
          <h1
            className={`
        max-w-[580px]
        text-[36px]
        font-black
        leading-[1.05]
        tracking-[-1.5px]
        sm:text-[52px]
        sm:leading-[1.03]
        sm:tracking-[-2px]
        lg:text-[68px]
        lg:leading-[1]
        ${textColor}
      `}
          >
            {item?.title}
          </h1>

          {/* 2. HIGHLIGHT */}
          {item?.highlight && (
            <h2
              className="
          mt-2
          max-w-[520px]
          text-[30px]
          font-black
          leading-[1.05]
          tracking-[-1px]
          text-[#C8A96E]
          sm:mt-3
          sm:text-[42px]
          sm:tracking-[-1.5px]
          lg:text-[52px]
        "
            >
              {item.highlight}
            </h2>
          )}

          {/* 3. DESCRIPTION */}
          <p
            className={`
        mt-5
        max-w-[470px]
        text-[13px]
        font-medium
        leading-[1.7]
        tracking-[0.1px]
        sm:mt-6
        sm:text-[15px]
        sm:leading-7
        lg:text-[16px]
        ${descriptionColor}
      `}
          >
            {item?.description}
          </p>

          {/* 4. TOP LEVEL ACTION */}
          <div className="mt-7">
            <button
              onClick={() => console.log("Hero button:", item?.button)}
              className={`
          group
          inline-flex
          items-center
          gap-3
          rounded-full
          px-7
          py-3.5
          text-[13px]
          font-black
          tracking-[0.2px]
          shadow-[0_8px_25px_rgba(0,0,0,0.18)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]
          active:translate-y-0
          active:scale-95
          sm:px-8
          sm:py-4
          sm:text-sm
          ${buttonClass}
        `}
            >
              <span>{item?.button}</span>

              <span
                className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-black/10
            text-lg
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
