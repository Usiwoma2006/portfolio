import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Wisdom Usiwoma | Software & AI Engineer",
  description:
    "Portfolio of Wisdom Usiwoma, a software engineer building AI-powered products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}