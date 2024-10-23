import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Portail Maladie de Horton",
  description: "Portail de suivi et d'information pour les patients atteints de la maladie de Horton",
  keywords: "maladie de horton, suivi médical, symptômes, traitement, vascularite",
  authors: [{ name: "Portail Maladie de Horton" }],
  openGraph: {
    title: "Portail Maladie de Horton",
    description: "Suivi personnalisé et ressources pour la maladie de Horton",
    type: "website",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}