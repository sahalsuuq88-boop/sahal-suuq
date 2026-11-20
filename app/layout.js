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
  title: "AWL MINI MARKET",
  description: "AWL Trading",
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
