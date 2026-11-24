import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

import { UserProvider } from "./hook/useUser";
import { ShopProvider } from "./ShopContext";
import { ReduxProvider } from "./redux/Providers";
import { WishlistProvider } from "./context/wishlist";
import { GoogleOAuthProvider } from "@react-oauth/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Hel Suuq | Gurigaaga, Gaadhsii - Online Shopping Hargeisa",
    template: "%s | Sahal Suuq",
  },
  description:
    "Hel Suuq waa suuqa online-ka ah ee Hargeisa. Ka dalbo raashinka, agabka nadaafadda, iyo alaabta guriga si fudud — Gurigaaga, gaadhsii.",
  keywords: [
    "Hel Suuq",
    "helsuuq",
    "Hel Suuq Hargeisa",
    "online shopping Hargeisa",
    "delivery Hargeisa",
    "Somaliland e-commerce",
  ],
  openGraph: {
    title: "HEL Suuq | Gurigaaga, Gaadhsii",
    description: "Ka dalbo alaabta guriga iyo raashinka Hargeisa si fudud oo degdeg ah.",
    url: "https://sahalsuuq-frontend.vercel.app",
    siteName: "Hel Suuq",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_WEB_CLIENT_ID}>
          <ReduxProvider>
            <ShopProvider>
              <WishlistProvider>
                <UserProvider>
                  {children}
                  <Toaster />
                </UserProvider>
              </WishlistProvider>
            </ShopProvider>
          </ReduxProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
