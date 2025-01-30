import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tech Charity - Empowering Through Technology',
  description: 'Support our mission to empower communities through technology.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <head>
        <style>
          {`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-in {
              animation: fadeIn 1s ease-out forwards;
            }

            .animate-on-scroll {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 1s ease-out, transform 1s ease-out;
            }

            .animate-on-scroll.animate-fade-in {
              opacity: 1;
              transform: translateY(0);
            }
          `}
        </style>
      </head>
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
} 