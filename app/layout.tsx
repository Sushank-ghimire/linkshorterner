import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Unlimited Free Link Shorterner",
  description: "Unlimited Free Link Shorterner",
  keywords: [
    "Link shorterner",
    "Unlimired",
    "Free",
    "Earn Money Unlimited",
    "Best Link Shorterner",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-screen antialiased`}
      >
        <ThemeProvider defaultTheme="system">
          <Navbar />
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
