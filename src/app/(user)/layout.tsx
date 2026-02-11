import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/src/features/navbar";
import { Footer } from "@/src/features/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Navbar />
      {children}
      <Footer />
    </body>
  );
}
