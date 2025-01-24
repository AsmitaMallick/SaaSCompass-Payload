// 'use client'

// // import type { Metadata } from "next";
// // import { SessionProvider } from "next-auth/react";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });



// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">

//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
'use client'

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import "./globals.css";
import { AuthModal } from "./components/auth-modal";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-[#0F1218]`}
      >
        <SessionProvider>
          {children}
          <AuthModal />
          <Link 
            href="/admin" 
            className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-colors duration-200 z-50"
          >
            Admin Panel
          </Link>
        </SessionProvider>
      </body>
    </html>
  );
}