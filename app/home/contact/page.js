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

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-16">
        {/* HEADER */}
        <section className="mb-10 md:mb-12">
          <div className="mb-4 flex items-center gap-2">
            <IonIcon
              icon={chatbubbleEllipsesOutline}
              className="h-4 w-4 text-[#A4865A]"
            />

            <span className="text-[10px] font-extrabold tracking-[2px] text-[#A4865A]">
              GET IN TOUCH
            </span>
          </div>

          <h1 className="text-4xl font-semibold leading-tight text-[#292524] md:text-5xl">
            Waxaan jeclaan lahayn
            <br />
            <span className="font-normal text-[#C5A880]">
              inaan ku maqalno.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#78716C]">
            Haddii aad qabto wax su&apos;aalo ah oo ku saabsan alaabtayada
            ama aad u baahan tahay caawinaad gaar ah, nala soo xiriir
            wakhti kasta.
          </p>
        </section>

        {/* CONTACT INFORMATION */}
        <section className="mb-5 rounded-[18px] border border-[#E7E5E4] bg-white px-4">
          {/* LOCATION */}
          <div className="flex items-center py-[17px]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#F8F4EC]">
              <IonIcon
                icon={locationOutline}
                className="h-[21px] w-[21px] text-[#A4865A]"
              />
            </div>

            <div className="ml-[13px]">
              <p className="mb-1 text-[9px] font-extrabold tracking-[1.5px] text-[#78716C]">
                XAFIISKA GUUD
              </p>

              <p className="text-[13px] font-medium text-[#292524]">
                Hargeisa, Somaliland
              </p>
            </div>
          </div>

          <div className="h-px bg-[#F0EEEB]" />

          {/* EMAIL */}
          <div className="flex items-center py-[17px]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#F8F4EC]">
              <IonIcon
                icon={mailOutline}
                className="h-[21px] w-[21px] text-[#A4865A]"
              />
            </div>

            <div className="ml-[13px]">
              <p className="mb-1 text-[9px] font-extrabold tracking-[1.5px] text-[#78716C]">
                E-MAILKA
              </p>

              <p className="text-[13px] font-medium text-[#292524]">
                support@awl.online
              </p>
            </div>
          </div>
        </section>

        {/* FORM */}
        <section className="rounded-[20px] border border-[#E7E5E4] bg-white p-[18px] md:p-7">
          <h2 className="mb-5 text-lg font-bold text-[#292524]">
            Send us a message
          </h2>

          {/* SUCCESS */}
          {success && (
            <div className="mb-4 flex items-center gap-2 rounded-[10px] border border-[#BBF7D0] bg-[#F0FDF4] p-3">
              <IonIcon
                icon={checkmarkCircle}
                className="h-5 w-5 shrink-0 text-[#15803D]"
              />

              <p className="text-xs text-[#15803D]">
                {success}
              </p>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] p-3">
              <IonIcon
                icon={alertCircle}
                className="h-5 w-5 shrink-0 text-[#DC2626]"
              />

              <p className="text-xs text-[#DC2626]">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* FIRST + LAST NAME */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* FIRST NAME */}
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-[9px] font-extrabold tracking-[1.4px] text-[#78716C]"
                >
                  FIRST NAME
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="h-12 w-full rounded-[10px] border border-[#E7E5E4] bg-[#FAFAF9] px-[13px] text-[13px] text-[#292524] outline-none transition focus:border-[#A4865A]"
                />
              </div>

              {/* LAST NAME */}
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-[9px] font-extrabold tracking-[1.4px] text-[#78716C]"
                >
                  LAST NAME
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="h-12 w-full rounded-[10px] border border-[#E7E5E4] bg-[#FAFAF9] px-[13px] text-[13px] text-[#292524] outline-none transition focus:border-[#A4865A]"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="mt-[17px]">
              <label
                htmlFor="email"
                className="mb-2 block text-[9px] font-extrabold tracking-[1.4px] text-[#78716C]"
              >
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
                className="h-12 w-full rounded-[10px] border border-[#E7E5E4] bg-[#FAFAF9] px-[13px] text-[13px] text-[#292524] outline-none transition focus:border-[#A4865A]"
              />
            </div>

            {/* MESSAGE */}
            <div className="mt-[17px]">
              <label
                htmlFor="message"
                className="mb-2 block text-[9px] font-extrabold tracking-[1.4px] text-[#78716C]"
              >
                MESSAGE
              </label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows={6}
                className="w-full resize-none rounded-[10px] border border-[#E7E5E4] bg-[#FAFAF9] px-[13px] py-[13px] text-[13px] text-[#292524] outline-none transition focus:border-[#A4865A]"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-[22px] flex h-[54px] w-full items-center justify-center gap-2.5 rounded-[12px] bg-[#171717] transition hover:bg-[#292929] ${
                loading
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer"
              }`}
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span className="text-[10px] font-extrabold tracking-[1.5px] text-white">
                    SEND MESSAGE
                  </span>

                  <IonIcon
                    icon={arrowForward}
                    className="h-[18px] w-[18px] text-white"
                  />
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}