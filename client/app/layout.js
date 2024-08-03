import { Open_Sans } from 'next/font/google';
import "./globals.css";
import { websiteName } from "@/config";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from "@/components/Navbar";


const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: websiteName,
  description: "Frog Study Buddy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <UserProvider>
          <Navbar />
          <div className={openSans.className}>{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}
