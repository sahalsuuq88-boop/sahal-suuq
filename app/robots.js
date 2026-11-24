
const BASE_URL = "https://helsuuq-market.vercel.app";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/profile/",
        "/login/",
        "/register/",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
