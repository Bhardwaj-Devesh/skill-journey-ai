import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Career AI - Discover Your Ikigai',
  description: 'Find your perfect career path using AI-powered Ikigai analysis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          {children}
        </main>
      </body>
    </html>
  );
} 