import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import 'modern-normalize';
import './globals.css';

const fontManrope = Manrope({
  variable: '--font-family',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

const fontInter = Inter({
  variable: '--second-family',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rental Car',
  description: 'An app for rental car',
  metadataBase: new URL('http://localhost:3000'),
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
  },
  openGraph: {
    title: 'Rental Car',
    description: 'An app for rental car',
    url: 'http://localhost:3000', //тут має бути посилання на задеплоєний проект
    images: [
      {
        url: '/hero/hero-backgr.webp',
        width: 1200,
        height: 630,
        alt: 'Rental Car',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontManrope.variable} ${fontInter.variable}`}>
        {children}
      </body>
    </html>
  );
}
