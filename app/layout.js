import { Geist, Geist_Mono } from "next/font/google";
import Layout from "./components/Layout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AmarSolution",
  description: "A Total Solution of Your Business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>{children}</Layout> {/* Wrap with sidebar + topbar layout */}
      </body>
    </html>
  );
}
