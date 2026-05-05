import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MEL'S COLORS by Melvy Bou Rjeili — Art sur Commande",
  description:
    "Découvrez l'univers coloré de Mel. Peintures sur commande, personnalisées avec soin. Packs à partir de 10€.",
  openGraph: {
    title: "MEL'S COLORS by Melvy Bou Rjeili",
    description: "Art sur commande · Couleurs sur mesure",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
