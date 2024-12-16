import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DmMonoLight = localFont({
  src: "../fonts/DMMono-Light.ttf",
  variable: "--font-dmmono-light",
});

const DmMonoMedium = localFont({
  src: "../fonts/DMMono-Medium.ttf",
  variable: "--font-dmmono-medium",
});

const DmMonoRegular = localFont({
  src: "../fonts/DMMono-Regular.ttf",
  variable: "--font-dmmono-regular",
});

const InterRegular = localFont({
  src: "../fonts/Inter-Regular.ttf",
  variable: "--font-inter-regular",
});

const InterSemiBold = localFont({
  src: "../fonts/Inter-SemiBold.ttf",
  variable: "--font-inter-semibold",
});

const InterBold = localFont({
  src: "../fonts/Inter-Bold.ttf",
  variable: "--font-inter-bold",
});

export const metadata: Metadata = {
  title: "Now Think",
  description: "A Blog of thinker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${DmMonoLight.variable} ${InterRegular.variable} ${DmMonoMedium.className} ${DmMonoRegular.variable} ${InterSemiBold.variable} ${InterBold.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
