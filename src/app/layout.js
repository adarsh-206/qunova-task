import "./globals.css";

export const metadata = {
  title: "Live Market Insights",
  description: "Discover top-selling products to stock next",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
