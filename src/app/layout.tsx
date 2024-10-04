import type { Metadata } from "next";
import localFont from "next/font/local";
import DefaultPage from "./home/DefaultPage";

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
const museoSans = localFont({
  src: "./fonts/MuseoSans_500.otf",
  variable: "--font-museo-sans",
  weight: "100 900",
});
const museoMono = localFont({
  src: "./fonts/MuseoSans_500.otf",
  variable: "--font-museo-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HLTY Beings",
  description: "The Hezalth Beings Collective",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${museoSans.variable} ${museoMono.variable} antialiased`}
        style={{ backgroundColor: '#f5f5f5' }}>
                <div>
      <DefaultPage />
    </div>

      </body>
    </html>
  );
}
