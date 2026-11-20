"use client";

import React, { useEffect, useState } from "react";
import aboutService from "../../services/about";

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadAbout = async () => {
    try {
      setError("");

      const data = await aboutService.get();
      setAbout(data);
    } catch (err) {
      console.log("About error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load company information."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAbout();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAbout();
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-[#EDE6D9] border-t-[#A4865A] animate-spin" />

        <p className="mt-4 text-sm text-stone-500">
          Loading...
        </p>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-700 text-2xl font-bold">
          !
        </div>

        <h2 className="mt-5 text-xl font-bold text-stone-800">
          Something went wrong
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
          {error}
        </p>

        <button
          onClick={handleRefresh}
          className="mt-6 rounded-xl bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
        >
          Try Again
        </button>
      </div>
    );
  }

  /* =========================
     EMPTY
  ========================= */

  if (!about) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F4EC] text-2xl font-bold text-[#A4865A]">
          i
        </div>

        <p className="mt-4 text-sm text-stone-500">
          About information is not available.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:px-10">

        {/* =========================
            REFRESH
        ========================= */}

        <div className="flex justify-end">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-sm transition hover:border-[#C5A880] hover:text-[#A4865A] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* =========================
            HERO
        ========================= */}

        <section className="mx-auto max-w-4xl py-16 text-center sm:py-20">

          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="text-lg text-[#A4865A]">
              ✦
            </span>

            <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#A4865A]">
              OUR LEGACY
            </span>
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-stone-800 sm:text-5xl lg:text-6xl">
            {about.title}
          </h1>

          {about.subtitle && (
            <p className="mt-5 text-lg italic text-[#C5A880] sm:text-xl">
              {about.subtitle}
            </p>
          )}

          {about.description && (
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-stone-500 sm:text-base">
              {about.description}
            </p>
          )}
        </section>

        {/* =========================
            STORY
        ========================= */}

        {about.story && (
          <section className="border-y border-stone-200 py-10 sm:py-12">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#A4865A]" />

              <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#A4865A]">
                OUR STORY
              </span>
            </div>

            <p className="max-w-4xl text-base font-medium leading-8 text-stone-700 sm:text-lg sm:leading-9">
              {about.story}
            </p>
          </section>
        )}

        {/* =========================
            MISSION + VISION
        ========================= */}

        {(about.mission || about.vision) && (
          <section className="grid gap-5 py-10 sm:grid-cols-2 sm:py-12">

            {about.mission && (
              <div className="group rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8F4EC] text-xl text-[#A4865A]">
                  ◎
                </div>

                <h2 className="text-lg font-bold text-stone-800">
                  Mission
                </h2>

                <p className="mt-3 text-sm leading-7 text-stone-500">
                  {about.mission}
                </p>
              </div>
            )}

            {about.vision && (
              <div className="group rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8F4EC] text-xl text-[#A4865A]">
                  ◉
                </div>

                <h2 className="text-lg font-bold text-stone-800">
                  Vision
                </h2>

                <p className="mt-3 text-sm leading-7 text-stone-500">
                  {about.vision}
                </p>
              </div>
            )}

          </section>
        )}

        {/* =========================
            VALUES
        ========================= */}

        {about.values?.length > 0 && (
          <section className="py-4 pb-12">

            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-stone-800">
                What We Stand For
              </h2>

              <p className="mt-1 text-sm text-stone-400">
                Our core values
              </p>
            </div>

            <div className="space-y-3">
              {about.values.map((value, index) => (
                <div
                  key={`${value.title}-${index}`}
                  className="group flex gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition duration-300 hover:border-[#DCCBB0] hover:shadow-md sm:p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F8F4EC] text-xs font-extrabold text-[#A4865A]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-stone-800">
                      {value.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-stone-500">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* =========================
            CONTACT
        ========================= */}

        <section className="overflow-hidden rounded-3xl bg-[#171717] p-6 shadow-xl sm:p-8 lg:p-10">

          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Let's Stay Connected
            </h2>

            <p className="mt-2 text-sm text-stone-400">
              We are always happy to hear from you.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">

            {about.address && (
              <ContactItem
                icon="⌖"
                label="ADDRESS"
                value={about.address}
              />
            )}

            {about.email && (
              <ContactItem
                icon="✉"
                label="EMAIL"
                value={about.email}
              />
            )}

            {about.phone && (
              <ContactItem
                icon="☎"
                label="PHONE"
                value={about.phone}
              />
            )}

          </div>
        </section>

        {/* =========================
            FOOTER
        ========================= */}

        <p className="py-7 text-center text-[10px] tracking-wide text-stone-400">
          SAHAL SUUQ • Premium Digital Commerce
        </p>

      </div>
    </main>
  );
}

/* =========================
   CONTACT ITEM
========================= */

function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2C2926] text-lg text-[#A4865A]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-extrabold tracking-[0.18em] text-stone-500">
          {label}
        </p>

        <p className="mt-1 break-words text-sm text-white">
          {value}
        </p>
      </div>

    </div>
  );
}