
"use client";

import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  chatbubbleEllipsesOutline,
  locationOutline,
  mailOutline,
  checkmarkCircle,
  alertCircle,
  arrowForward,
  logoWhatsapp,
  callOutline,
  sendOutline,
  timeOutline,
} from "ionicons/icons";

import contactService from "../../services/contect";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setError("Fadlan dhammaan meelaha buuxi.");
      return;
    }

    try {
      setLoading(true);

      const data = await contactService.create(form);

      setSuccess(
        data?.message || "Fariintaada si guul leh ayaa loo diray."
      );

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.log("Contact error:", err);

      setError(
        err?.response?.data?.message ||
          "Fariinta lama diri karin. Fadlan isku day mar kale."
      );
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = "252636035585";
  const emailAddress = "fuaadi174@gmail.com";

  const inputClass =
    "h-[52px] w-full rounded-xl border border-[#EAE5DC] bg-[#FDFCF9] px-4 text-sm text-[#292524] outline-none transition-all duration-300 placeholder:text-[#A8A29E] focus:border-[#B4976A] focus:bg-white focus:ring-4 focus:ring-[#B4976A]/10";

  const labelClass =
    "mb-2.5 block text-[10px] font-bold tracking-[1.5px] text-[#78716C]";

  return (
    <main className="min-h-screen overflow-hidden bg-[#FDFBF7] text-[#292524]">

      {/* HERO */}
      <section className="relative border-b border-[#EAE5DC]">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#D8C5A4]/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2EBDD]">
              <IonIcon
                icon={chatbubbleEllipsesOutline}
                className="text-lg text-[#A4865A]"
              />
            </div>

            <span className="text-[10px] font-extrabold tracking-[3px] text-[#A4865A]">
              WE ARE HERE FOR YOU
            </span>
          </div>

          <div className="grid items-end gap-8 md:grid-cols-[1fr_350px]">

            <div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-2px] md:text-7xl md:tracking-[-3px]">
                Let's start a
                <br />
                <span className="font-normal italic text-[#B4976A]">
                  conversation.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-sm leading-7 text-[#78716C] md:text-base">
                Waxaan mar walba diyaar u nahay inaan ku caawinno.
                Haddii aad qabto su'aal, talo ama aad u baahan tahay
                caawinaad ku saabsan adeeggeenna, nala soo xiriir.
              </p>
            </div>

            <div className="hidden border-l border-[#E7E0D5] pb-2 pl-7 md:block">
              <p className="text-[10px] font-bold tracking-[2px] text-[#A4865A]">
                SAHAL SUUQ
              </p>

              <p className="mt-3 text-sm leading-7 text-[#78716C]">
                Your trusted shopping destination.
                Quality products, reliable service.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-20">

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

          {/* LEFT INFORMATION */}
          <div>

            <div className="mb-8">
              <p className="text-[10px] font-extrabold tracking-[2.5px] text-[#A4865A]">
                CONTACT INFORMATION
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                We'd love to hear
                <br />
                from you.
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#78716C]">
                Doorashadaada iyo kalsoonidaadu waa muhiim.
                Si xor ah noola soo xiriir.
              </p>
            </div>

            {/* CONTACT CARDS */}
            <div className="space-y-3">

              {/* EMAIL */}
              <a
                href={`mailto:${emailAddress}`}
                className="group flex items-center gap-4 rounded-2xl border border-[#EAE5DC] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8B28D] hover:shadow-lg hover:shadow-[#292524]/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F6F1E8] transition-colors group-hover:bg-[#EEE4D2]">
                  <IonIcon
                    icon={mailOutline}
                    className="text-xl text-[#A4865A]"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-[9px] font-extrabold tracking-[1.5px] text-[#A8A29E]">
                    EMAIL US
                  </p>

                  <p className="break-all text-sm font-semibold text-[#292524]">
                    {emailAddress}
                  </p>
                </div>

                <IonIcon
                  icon={arrowForward}
                  className="text-lg text-[#A8A29E] transition-transform group-hover:translate-x-1 group-hover:text-[#A4865A]"
                />
              </a>

              {/* PHONE */}
              <a
                href="tel:+252636035585"
                className="group flex items-center gap-4 rounded-2xl border border-[#EAE5DC] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8B28D] hover:shadow-lg hover:shadow-[#292524]/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F6F1E8] transition-colors group-hover:bg-[#EEE4D2]">
                  <IonIcon
                    icon={callOutline}
                    className="text-xl text-[#A4865A]"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-[9px] font-extrabold tracking-[1.5px] text-[#A8A29E]">
                    CALL US
                  </p>

                  <p className="text-sm font-semibold text-[#292524]">
                    +252 63 6035585
                  </p>
                </div>

                <IonIcon
                  icon={arrowForward}
                  className="text-lg text-[#A8A29E] transition-transform group-hover:translate-x-1 group-hover:text-[#A4865A]"
                />
              </a>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-[#EAE5DC] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8B28D] hover:shadow-lg hover:shadow-[#292524]/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F6F1E8] transition-colors group-hover:bg-[#EEE4D2]">
                  <IonIcon
                    icon={logoWhatsapp}
                    className="text-xl text-[#A4865A]"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-[9px] font-extrabold tracking-[1.5px] text-[#A8A29E]">
                    WHATSAPP
                  </p>

                  <p className="text-sm font-semibold text-[#292524]">
                    Chat with our team
                  </p>
                </div>

                <IonIcon
                  icon={arrowForward}
                  className="text-lg text-[#A8A29E] transition-transform group-hover:translate-x-1 group-hover:text-[#A4865A]"
                />
              </a>

              {/* LOCATION */}
              <div className="flex items-center gap-4 rounded-2xl border border-[#EAE5DC] bg-white p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F6F1E8]">
                  <IonIcon
                    icon={locationOutline}
                    className="text-xl text-[#A4865A]"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-[9px] font-extrabold tracking-[1.5px] text-[#A8A29E]">
                    VISIT OUR LOCATION
                  </p>

                  <p className="text-sm font-semibold leading-6 text-[#292524]">
                    Suuqa Hoose, Waaheen Market
                  </p>

                  <p className="text-xs text-[#78716C]">
                    Hargeisa, Somaliland
                  </p>
                </div>
              </div>

            </div>

            {/* WHATSAPP CTA */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Salaan Sahal Suuq, waxaan u baahanahay caawinaad.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#1D1D1B] text-xs font-bold tracking-[1.5px] text-white transition-all duration-300 hover:bg-[#A4865A]"
            >
              <IonIcon icon={logoWhatsapp} className="text-xl" />
              CHAT WITH US ON WHATSAPP
              <IonIcon icon={arrowForward} className="text-lg" />
            </a>

          </div>

          {/* RIGHT FORM */}
          <div className="rounded-[24px] border border-[#EAE5DC] bg-white p-5 shadow-[0_15px_60px_rgba(41,37,36,0.035)] md:p-9">

            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-extrabold tracking-[2px] text-[#A4865A]">
                  SEND A MESSAGE
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  How can we help?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#78716C]">
                  Fariintaada noo soo dir, waan kula soo xiriiri doonnaa.
                </p>
              </div>

              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F6F1E8] sm:flex">
                <IonIcon
                  icon={sendOutline}
                  className="text-xl text-[#A4865A]"
                />
              </div>
            </div>

            {/* SUCCESS */}
            {success && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                <IonIcon
                  icon={checkmarkCircle}
                  className="mt-0.5 shrink-0 text-xl text-green-600"
                />

                <p className="text-sm leading-6 text-green-700">
                  {success}
                </p>
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <IonIcon
                  icon={alertCircle}
                  className="mt-0.5 shrink-0 text-xl text-red-600"
                />

                <p className="text-sm leading-6 text-red-700">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    FIRST NAME
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Your first name"
                    autoComplete="given-name"
                    className={inputClass}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    LAST NAME
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Your last name"
                    autoComplete="family-name"
                    className={inputClass}
                    disabled={loading}
                  />
                </div>

              </div>

              {/* EMAIL */}
              <div className="mt-6">
                <label htmlFor="email" className={labelClass}>
                  EMAIL ADDRESS
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputClass}
                  disabled={loading}
                />
              </div>

              {/* MESSAGE */}
              <div className="mt-6">
                <label htmlFor="message" className={labelClass}>
                  YOUR MESSAGE
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={6}
                  disabled={loading}
                  className="w-full resize-none rounded-xl border border-[#EAE5DC] bg-[#FDFCF9] px-4 py-4 text-sm leading-7 text-[#292524] outline-none transition-all duration-300 placeholder:text-[#A8A29E] focus:border-[#B4976A] focus:bg-white focus:ring-4 focus:ring-[#B4976A]/10 disabled:opacity-60"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="mt-7 flex h-[56px] w-full items-center justify-center gap-3 rounded-xl bg-[#1D1D1B] text-xs font-extrabold tracking-[1.5px] text-white transition-all duration-300 hover:bg-[#A4865A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    SENDING MESSAGE...
                  </>
                ) : (
                  <>
                    SEND MESSAGE
                    <IonIcon icon={arrowForward} className="text-lg" />
                  </>
                )}
              </button>

              <p className="mt-5 text-center text-[11px] leading-5 text-[#A8A29E]">
                Thank you for choosing Sahal Suuq.
                <br />
                We're always happy to assist you.
              </p>

            </form>
          </div>

        </div>
      </section>

      {/* LOCATION BANNER */}
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-10 md:pb-24">
        <a
          href="https://www.google.com/maps/search/?api=1&query=Waaheen+Market+Hargeisa+Somaliland"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[24px] bg-[#22211F] p-7 text-white transition-all duration-300 hover:bg-[#302D28] md:flex-row md:items-center md:p-10"
        >
          <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-125" />

          <div className="relative flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <IonIcon
                icon={locationOutline}
                className="text-2xl text-[#D2B88D]"
              />
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-[2px] text-[#D2B88D]">
                FIND US HERE
              </p>

              <h3 className="mt-2 text-lg font-semibold md:text-xl">
                Waaheen Market, Hargeisa
              </h3>

              <p className="mt-1 text-xs text-white/55">
                Suuqa Hoose, Hargeisa, Somaliland
              </p>
            </div>
          </div>

          <div className="relative flex items-center gap-3 text-xs font-bold tracking-[1.5px] text-[#D2B88D]">
            GET DIRECTIONS
            <IonIcon
              icon={arrowForward}
              className="text-lg transition-transform group-hover:translate-x-1"
            />
          </div>
        </a>
      </section>

      {/* FOOTER NOTE */}
      <div className="border-t border-[#EAE5DC] py-7 text-center">
        <p className="text-[10px] font-medium tracking-[1px] text-[#A8A29E]">
          SAHAL SUUQ © {new Date().getFullYear()} — WE'RE HERE TO HELP.
        </p>
      </div>

    </main>
  );
}
