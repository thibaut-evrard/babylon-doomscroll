import type {Metadata} from 'next';
import {Chakra_Petch, Geist_Mono} from 'next/font/google';
import './globals.scss';

const chakraPetch = Chakra_Petch({
  weight: ['400', '700'],
  variable: '--font-chakra-petch',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Three Tools',
  description: 'Three.js toolkit',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${chakraPetch.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
