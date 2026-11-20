"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  LocateFixed,
  MapPin,
  Check,
  Navigation,
  Loader2,
} from "lucide-react";

import dynamic from "next/dynamic";

const RealMap = dynamic(() => import("./RealMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] items-center justify-center bg-[#F5F3EF]">
      <Loader2 className="h-8 w-8 animate-spin text-[#2D2417]" />
    </div>
  ),
});

export default function LocationMap() {
  const router = useRouter();

  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  // ============================================
  // GET REAL CURRENT GPS LOCATION
  // ============================================

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        console.log("CURRENT GPS LOCATION:", newLocation);

        setLocation(newLocation);
        setLocationLoading(false);
      },

      (error) => {
        console.error("LOCATION ERROR:", error);

        let message =
          "Your location could not be detected. Please check your location settings.";

        if (error.code === 1) {
          message =
            "Location permission was denied. Please allow location access in your browser.";
        }

        if (error.code === 2) {
          message =
            "Your location is unavailable. Please check GPS or internet connection.";
        }

        if (error.code === 3) {
          message = "Location request timed out. Please try again.";
        }

        alert(message);

        setLocationLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // ============================================
  // CONFIRM LOCATION
  // ============================================

  const confirmLocation = () => {
    if (!location) {
      alert("Please select a delivery location first.");
      return;
    }

    router.push(
      `/home/cart?latitude=${location.latitude}&longitude=${location.longitude}&ts=${Date.now()}`
    );
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      {/* HEADER */}

      <header className="border-b border-[#E9E5DE] bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6">
          <button
            onClick={() => router.back()}
            className="mr-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F3EF] text-[#111] transition hover:bg-[#EAE6DF]"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-xl font-extrabold text-[#111]">
              Delivery Location
            </h1>

            <p className="mt-1 text-xs text-[#777]">
              Choose your exact delivery location
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_360px]">
        {/* REAL INTERACTIVE MAP */}

        <section className="relative min-h-[600px] overflow-hidden rounded-2xl border border-[#E9E5DE] bg-white shadow-sm">
          <RealMap
            location={location}
            setLocation={setLocation}
          />

          {/* CURRENT LOCATION BUTTON */}

          <div className="absolute bottom-5 left-5 right-5 z-[1000]">
            <button
              onClick={getCurrentLocation}
              disabled={locationLoading}
              className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#2D2417] px-5 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#443827] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {locationLoading ? (
                <>
                  <Loader2
                    size={21}
                    className="animate-spin"
                  />

                  <span>Getting Location...</span>
                </>
              ) : (
                <>
                  <LocateFixed size={21} />

                  <span>Use Current Location</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* SIDE PANEL */}

        <aside className="flex flex-col gap-4">
          {/* INFO */}

          <div className="rounded-2xl border border-[#E9E5DE] bg-white p-4 shadow-sm">
            <div className="flex gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F0E9]">
                <Navigation
                  size={21}
                  className="text-[#2D2417]"
                />
              </div>

              <div>
                <h2 className="text-sm font-extrabold text-[#2D2417]">
                  Choose your location
                </h2>

                <p className="mt-1 text-xs leading-5 text-[#666]">
                  Drag and zoom the map to any location.
                  Click anywhere to select the exact delivery point.
                </p>
              </div>
            </div>
          </div>

          {/* NO LOCATION */}

          {!location && (
            <div className="rounded-2xl border border-dashed border-[#D8D3CA] bg-[#FAF8F4] p-6 text-center">
              <MapPin
                size={32}
                className="mx-auto text-[#9B9285]"
              />

              <p className="mt-3 text-sm font-bold text-[#555]">
                No location selected
              </p>

              <p className="mt-1 text-xs leading-5 text-[#888]">
                Click anywhere on the map or use your current GPS location.
              </p>
            </div>
          )}

          {/* SELECTED LOCATION */}

          {location && (
            <>
              <div className="rounded-2xl border border-[#E5F0E9] bg-[#F3F7F4] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2D2417] text-white">
                    <MapPin
                      size={19}
                      fill="currentColor"
                    />
                  </div>

                  <div>
                    <h2 className="text-sm font-extrabold text-[#2D2417]">
                      Location Selected
                    </h2>

                    <p className="mt-3 text-xs text-[#666]">
                      Latitude
                    </p>

                    <p className="font-mono text-sm font-bold text-[#2D2417]">
                      {location.latitude.toFixed(6)}
                    </p>

                    <p className="mt-3 text-xs text-[#666]">
                      Longitude
                    </p>

                    <p className="font-mono text-sm font-bold text-[#2D2417]">
                      {location.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>

              {/* CONFIRM */}

              <button
                onClick={confirmLocation}
                className="flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#2D2417] text-sm font-extrabold text-white shadow-sm transition hover:bg-[#443827] active:scale-[0.99]"
              >
                <span>Confirm Location</span>

                <Check
                  size={20}
                  strokeWidth={3}
                />
              </button>
            </>
          )}
        </aside>
      </div>
    </main>
  );
}

