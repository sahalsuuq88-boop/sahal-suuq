export default function sitemap() {
  return [
    {
      url: "https://sahalsuuq-frontend.vercel.app/home",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    // Ku dar bogagga kale ee muhiimka ah sida /products ama /about
  ];
}